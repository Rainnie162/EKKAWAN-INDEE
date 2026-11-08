// Real Wedding Theme Song Audio Player
class WeddingAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners: ((playing: boolean) => void)[] = [];

  constructor() {
    // Only initialize in browser environment
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this.audio) return;
    try {
      this.audio = new Audio('/assets/aistudio/wedding_theme_song.mp3');
      this.audio.loop = true;
      this.audio.preload = 'metadata';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });
    } catch (e) {
      console.warn('Audio initialization deferred', e);
    }
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying));
  }

  public async play(): Promise<boolean> {
    this.init();
    if (!this.audio) return false;

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      console.warn('Playback error or user interaction needed:', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();
