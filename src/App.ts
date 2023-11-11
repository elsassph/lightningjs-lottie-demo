import { Utils } from '@lightningjs/sdk'
import Lightning from '@lightningjs/core'
import lottieAnimData from './LottieAnim.json'
import LottieViewer from './LottieViewer'

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: {
    Logo: object
    Mystery: object
    Text: object
    LottieAnim: typeof LottieViewer
  }
}

export class App
  extends Lightning.Component<AppTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  /*
   * The following properties exist to make it more convenient to access elements
   * below in a type-safe way. They are optional.
   *
   * See https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/TemplateSpecs?id=using-a-template-spec
   * for more information.
   */
  readonly Background = this.getByRef('Background')!
  readonly LottieAnim = this.Background.getByRef('LottieAnim')!

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
        Logo: {
          mountX: 0.5,
          mountY: 1,
          x: 960,
          y: 600,
          src: Utils.asset('images/logo.png'),
        },
        Text: {
          mount: 0.5,
          x: 960,
          y: 720,
          text: {
            text: "Let's start Building!",
            fontFace: 'Regular',
            fontSize: 64,
            textColor: 0xbbffffff,
          },
        },
        LottieAnim: {
          type: LottieViewer,
          x: 960,
          y: 860,
          mount: 0.5,
          autoPlay: true,
          loop: true,
          width: 200,
          height: 200,
          animationData: lottieAnimData,
        },
      },
    }
  }

  static getFonts() {
    return [
      {
        family: 'Regular',
        url: Utils.asset('fonts/Roboto-Regular.ttf') as string,
      },
    ]
  }

  override _handleEnter() {
    if (this.LottieAnim.isPaused) this.LottieAnim.play()
    else this.LottieAnim.pause()
  }

  override _init() {
    this.stage.transitions.defaultTransitionSettings.duration = 3
    this.Background.animation({
      duration: 15,
      repeat: -1,
      delay: 1,
      actions: [
        {
          p: 'color',
          v: {
            0: { v: 0xfffbb03b },
            0.5: { v: 0xfff46730 },
            0.8: { v: 0xfffbb03b },
          },
        },
      ],
    }).start()
  }
}
