import PubSub from 'eventemitter3';

import {
  SPEED_ARG,
  DEFAULT_TRACK_SIZE,
  DEFAULT_RENDER_INTERVAL,
  defaultRollingBoardData
} from './constants';

import { getTranslateX, tap } from './dom';

export default class RollingBoarding {
  constructor(options) {
    // 容器（HTML 元素）
    this._container = options.container;
    // 容器宽度
    this._totalWidth = null;
    // 容器高度
    this._totalHeight = null;
    // 轨道高度
    this._trackSize = options.trackSize || DEFAULT_TRACK_SIZE;
    // 队列轮询间隔
    this._renderInterval = parseInt(options.renderInterval) || DEFAULT_RENDER_INTERVAL;
    // 队列轮询 setTimeout 计时器
    this._renderTimer = null;
    // 数据队列
    this._queue = [];
    // 轨道数据
    this._tracks = null;
    // 节点自编 id 累加器
    this._autoId = 0;
    this._hub = new PubSub();

    // 初始化容器尺寸和轨道数据结构
    this.resize();
    this._resetTracks();
  }

  on(key, fn = () => {}) {
    this._hub.on(key, fn);
  }

  off(key, fn = () => {}) {
    this._hub.off(key, fn);
  }

  trigger(key, data) {
    this._hub.emit(key, data);
  }

  // 容器大小变化时调用此方法
  resize() {
    // 容器总宽度
    this._totalWidth = this._container.offsetWidth;
    // 容器总高度
    this._totalHeight = this._container.offsetHeight;
    // 避免当前屏的数据错乱，全部清掉
    this.clearScreen();

    if (this._totalWidth <= 0) {
      console.warn('容器宽度异常');
    }

    if (this._totalHeight <= 0) {
      console.warn('容器高度异常');
    }
  }

  // 清屏
  clearScreen() {
    this._clearRollingNodes();
    this._resetTracks();
  }

  // 重置轨道数据
  _resetTracks() {
    const count = Math.floor(this._totalHeight / this._trackSize);
    this._tracks = new Array(count);
    for (let i = 0; i < count; i++) {
      this._tracks[i] = [];
    }
  }

  // 循环节点
  _eachRollingNode(fn) {
    let child = this._container.firstChild;
    let id, y;
    while (child) {
      if (child.nodeType === 1) {
        y = child.getAttribute('data-y');
        id = child.getAttribute('data-id');
        if (y && id) { fn(child, Number(y), Number(id)); }
      }
      child = child.nextSibling;
    }
  }

  // 清空所有播放中的节点
  _clearRollingNodes() {
    const nodes = [];
    this._eachRollingNode((node) => {
      nodes.push(node);
    });
    nodes.forEach((node) => {
      this._container.removeChild(node);
    });
  }

  // 数据解析与复制
  _parseData(data) {
    return Object.assign({
      autoId: ++this._autoId
    }, defaultRollingBoardData, data);
  }

  // 添加数据到队列
  add(data) {
    this._queue.push(this._parseData(data));
    // 如果队列轮询已经停止，则启动
    if (!this._renderTimer) { this._render(); }
  }

  // 把数据放置到合适的轨道
  _addToTrack(data) {
    // 单条轨道
    let track;
    // 轨道的最后一项数据
    let lastItem;
    // 节点已经走的路程
    let distance;
    // 节点数据最终坐落的轨道索引
    // 有些节点会占多条轨道，所以 y 是个数组
    let y = [];

    const findTrack = (i) => {
      track = this._tracks[i];
      // let flag = false;

      if (track.length) {
        // 轨道被占用，要计算是否会重叠
        // 只需要跟轨道最后一个节点比较即可
        lastItem = track[track.length - 1];

        // 获取已滚动距离（即当前的 translateX）
        distance = -getTranslateX(lastItem.node);

        // 通过速度差，计算最后一个节点全部消失前，是否会与新增节点重叠
        // 如果不会重叠，则可以使用当前轨道
        if (
          (distance > lastItem.width) &&
          (
            (data.rollSpeed <= lastItem.rollSpeed) ||
            ((distance - lastItem.width) / (data.rollSpeed - lastItem.rollSpeed) >
              (this._totalWidth + lastItem.width - distance) / lastItem.rollSpeed)
          )
        ) {
          y.push(i);
        } else {
          y = [];
        }

      } else {
        // 轨道未被占用
        y.push(i);
      }

      // 有足够的轨道可以用时，就可以新增节点了，否则等下一次轮询
      if (y.length >= data.useTracks) {
        data.y = y;
        y.forEach((i) => {
          this._tracks[i].push(data);
        });
        return true;
      }
    };

    // 随机选择一个轨道索引，开始寻找可插入的轨道
    const startTrack = Math.floor(Math.random() * this._tracks.length);

    for (let i = startTrack; i < this._tracks.length; i++) {
      const result = findTrack(i);
      if (result) { break; }
    }
  }

  // （节点飘到尽头后）从轨道中移除对应数据
  _removeFromTrack(y, id) {
    y.forEach((i) => {
      const track = this._tracks[i];
      for (let j = 0; j < track.length; j++) {
        if (track[j].autoId === id) {
          track.splice(j, 1);
          break;
        }
      }
    });
  }

  // 轮询渲染
  _render() {
    if (this._paused) { return; }
    try {
      this._renderToDOM();
    } finally {
      this._renderEnd();
    }
  }

  // 通过 y 和 id 获取弹幕数据
  _findData(y, id) {
    const track = this._tracks[y];
    if (!track) { return; }
    for (let j = 0; j < track.length; j++) {
      if (track[j].autoId === id) {
        return track[j];
      }
    }
  }

  // 暂停弹幕
  pause() {
    if (this._resumeTimer) { clearTimeout(this._resumeTimer); }
    if (this._renderTimer) {
      clearTimeout(this._renderTimer);
      this._renderTimer = null;
    }

    if (this._paused) { return; }
    this._paused = true;

    this._eachRollingNode((node, y, id) => {
      const data = this._findData(y, id);
      if (data) {
        // 获取已滚动距离
        data.rolledDistance = -getTranslateX(node);

        // 移除动画，计算出弹幕所在的位置，固定样式
        node.style.transition = '';
        node.style.transform = `translateX(-${data.rolledDistance}px)`;
      }
    });
  }

  // 继续滚动弹幕
  resume() {
    if (!this._paused) { return; }

    this._eachRollingNode((node, y, id) => {
      const data = this._findData(y, id);
      if (data) {
        data.startTime = Date.now();
        // 重新计算滚完剩余距离需要多少时间
        data.rollTime = (data.totalDistance - data.rolledDistance) / data.rollSpeed;
        node.style.transition = `transform ${data.rollTime}s linear`;
        node.style.transform = `translateX(-${data.totalDistance}px)`;
      }
    });

    this._paused = false;

    if (!this._renderTimer) { this._render(); }
  }

  // 渲染为 DOM 节点
  _renderToDOM() {
    const data = this._queue[0];
    let node = data.node;

    if (!node) {
      // 节点节点基本样式
      data.node = node = document.createElement('div');
      if (data.msg) {
        // 是文字节点
        node.innerText = data.msg;
        node.style.whiteSpace = 'nowrap';
        node.style.color = data.fontColor;
        node.style.fontSize = data.fontSize + 'px';
      } else {
        // 是自定义节点
        const customNode = document.createElement('div');
        customNode.className = data.itemClass;
        customNode.style.backgroundImage = data.itemBg || '';
        customNode.style.width = `${data.itemStyleWidth}px` || '100%';
        customNode.style.height = `${data.itemStyleHeight}px` || '100%';
        node.appendChild(customNode);
      }
      node.style.position = 'absolute';
      node.style.left = '100%';
      node.style.willChange = 'transform';
      this._container.appendChild(node);

      data.useTracks = Math.ceil(node.offsetHeight / this._trackSize);
      // 占用的轨道数多于轨道总数，则忽略此数据
      if (data.useTracks > this._tracks.length) {
        this._queue.shift();
        this._container.removeChild(node);
        return;
      }

      data.width = node.offsetWidth;
      data.totalDistance = data.width + this._totalWidth;
      data.rollTime = data.rollTime ||
        Math.floor(data.totalDistance * SPEED_ARG * (Math.random() * 0.3 + 0.7));
      data.rollSpeed = data.totalDistance / data.rollTime;
    }

    // 判断是否有可用轨道
    this._addToTrack(data);

    // 是否已找到可用轨道
    if (data.y) {
      this._queue.shift();

      node.setAttribute('data-id', data.autoId);
      node.setAttribute('data-y', data.y[0]);
      node.style.top = data.y[0] * this._trackSize + 'px';
      node.style.transition = `transform ${data.rollTime}s linear`;
      node.style.transform = `translateX(-${data.totalDistance}px)`;
      node.addEventListener('transitionend', () => {
        this._removeFromTrack(data.y, data.autoId);
        if (node.parentNode && node.parentNode === this._container) {
          this._container.removeChild(node);
        }
      }, false);

      // 处理点击节点
      tap(node, (e) => {
        this.trigger('CLICK_ITEM', { e, data });
      });
    }
  }

  // 轮询结束后，根据队列长度继续执行或停止执行
  _renderEnd() {
    if (this._queue.length > 0) {
      this._renderTimer = setTimeout(() => {
        this._render();
      }, this._renderInterval);
    } else {
      // 如果已经没有数据，就不再轮询了，等有数据时（add 方法中）再开启轮询
      this._renderTimer = null;
    }
  }

  destroy() {
    clearTimeout(this._renderTimer);
    this._renderTimer = null;
    this.clearScreen();
  }
}
