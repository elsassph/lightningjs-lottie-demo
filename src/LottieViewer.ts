import Lightning from '@lightningjs/core'
import lottie, { AnimationItem } from 'lottie-web/build/player/lottie_light_canvas'

export interface ILottieDocument {
  v: string
  meta: object
  fr: number
  nm: string
  w: number
  h: number
}

export default class LottieViewer extends Lightning.Component {
  _canvas: HTMLCanvasElement | undefined
  _data: ILottieDocument | undefined
  _animation: AnimationItem | undefined
  _width = 0
  _height = 0
  _lastFrame = -1
  autoPlay = true
  loop = true

  set width(value: number) {
    this._width = value
    if (this._canvas) this._canvas.width = value
  }

  set height(value: number) {
    this._height = value
    if (this._canvas) this._canvas.height = value
  }

  set animationData(data: ILottieDocument) {
    if (this._animation) {
      this._animation.removeEventListener('drawnFrame', this._onLottieFrame)
      this._animation.destroy()
    }
    this._data = data

    // create a hidden canvas for Lottie
    this._canvas = document.createElement('canvas')
    this.w = this._canvas.width = this._width || data.w || 100
    this.h = this._canvas.height = this._height || data.h || 100

    // create Lottie animator, providing our canvas' 2d context
    this._animation = lottie.loadAnimation({
      container: undefined as unknown as HTMLElement, // undocumented: container is optional
      animationData: data,
      renderer: 'canvas',
      rendererSettings: {
        context: this._canvas.getContext('2d')!,
      },
      autoplay: this.autoPlay,
      loop: this.loop,
    })
    // listen to Lottie renders to update the texture
    this._animation.addEventListener('drawnFrame', this._onLottieFrame)
  }

  get isLoaded() {
    return this._animation?.isLoaded
  }
  get isPaused() {
    return this._animation?.isPaused
  }
  play() {
    this._animation?.play()
  }
  pause() {
    this._animation?.pause()
  }

  _onLottieFrame = (): void => {
    if (!this._animation) return

    // although lottie is rendering all the frames,
    // we can calculate a Lightning cache key to avoid creating new textures
    const frame = Math.round(this._animation.currentFrame)
    if (frame === this._lastFrame) return
    this._lastFrame = frame
    const name = this._animation.name || this._data?.nm
    const key = `lottie-${name}-${frame}-${this._width}-${this._height}`

    this.texture = Lightning.Tools.getCanvasTexture(
      (cb) => this._canvas && cb(null, this._canvas),
      key,
    )
  }

  // cleanup on detach
  override _detach() {
    if (this._animation) {
      this._animation.removeEventListener('drawnFrame', this._onLottieFrame)
      this._animation.destroy()
      this._animation = undefined
    }
    this._canvas = undefined
  }
}
