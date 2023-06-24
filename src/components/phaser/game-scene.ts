import Phaser from "phaser"
import { AnimationType, Dungeon, IAnim } from "../../types/enum"
import { MyGame } from "./game-container"
export default class GameScene extends Phaser.Scene {
  metadata: IAnim | undefined
  dungeon: Dungeon | undefined
  action = ""
  animUrl = ""
  shadowsUrl = ""

  constructor() {
    super({ key: "gameScene" })
  }

  init() {
    const { animationData, sprite, dungeon } = this.game as MyGame;
    this.metadata = animationData.Anims.Anim.find(m => m.Name === sprite.action);
    this.animUrl = sprite.animUrl;
    this.shadowsUrl = sprite.shadowsUrl;
    this.action = sprite.action;
    this.dungeon = dungeon;
  }

  preload() {
    const { FrameWidth, FrameHeight } = this.metadata as IAnim;
    this.load.image(
      "small-ba",
      `${process.env.PUBLIC_URL}/maps/${this.dungeon}.png`
    );
    this.load.spritesheet(
      `${this.action}-${AnimationType.ANIM}`,
      this.animUrl,
      { frameWidth: FrameWidth, frameHeight: FrameHeight }
    );
    this.load.spritesheet(
      `${this.action}-${AnimationType.SHADOW}`,
      this.shadowsUrl,
      { frameWidth: FrameWidth, frameHeight: FrameHeight }
    );
  }

  create() {
    for (const animationType of [AnimationType.ANIM, AnimationType.SHADOW]) {
      const frames = this.anims.generateFrameNumbers(
        `${this.action}-${animationType}`,
        { start: 0, end: -1 }
      );
      const singleAnim = this.metadata as IAnim;
      const durations = Array.isArray(singleAnim.Durations.Duration) ?
        singleAnim.Durations.Duration :
        [singleAnim.Durations.Duration];
      for (let i = 0; i < frames.length; i++) {
        frames[i]["duration"] = durations[i % durations.length] * 20;
      }
      this.anims.create({
        key: animationType.toString(),
        frames,
        repeat: -1
      });
    }

    const scaleFactor = this.metadata?.FrameHeight ?? 0 < 100 ? 2 : 1;
    this.add.image(100, 100, "small-ba").setScale(scaleFactor, scaleFactor);
    this.add
      .sprite(100, 105, `${this.action}-${AnimationType.SHADOW}`)
      .setScale(scaleFactor, scaleFactor)
      .setTintFill(0xffffff)
      .play(AnimationType.SHADOW);
    this.add
      .sprite(100, 105, `${this.action}-${AnimationType.ANIM}`)
      .setScale(scaleFactor, scaleFactor)
      .play(AnimationType.ANIM);
  }
}
