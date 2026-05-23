# Video Motion Effects (v3.21.0)

`AnimX.videoMotion()` manages `<video>` presentation states natively.

## The "Controls" Policy
A core security/accessibility rule in AnimX prohibits the programmatic removal of the `controls` HTML attribute or hijacking the user's playback timeline. 
When fading a video in, `videoMotion()` wraps the video in a temporary `<div>` and modulates the opacity of the wrapper, leaving the internal browser media player logic completely untouched.

```javascript
AnimX.videoMotion('video.promo', { state: 'ready' });
```
