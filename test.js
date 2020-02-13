const ffmpeg = require('ffmpeg')

const test = new ffmpeg('lrn-02.flv')

test.then(video => {
  console.log('metadata', video.metadata)
  console.log('info_configuration', video.info_configuration)
  video.fnExtractSoundToMP3 ('./test/lrn-02.mp3', (err, files) => {
    if (!err) console.log('files', files)
    if (err) console.log('err', err)
  })
})

// test.then(video => {
//   console.log('metadata', video.metadata)
//   console.log('info_configuration', video.info_configuration)
//   video.fnExtractFrameToJPG('./test', {
//     frame_rate : 0.05,
//     // number : 5,
//     file_name : 'lrn-12-'
//   }, (err, files) => {
//     if (!err) console.log('files', files)
//     if (err) console.log('err', err)
//   })
// })

// new ffmpeg('./test-video.mp4', function (err, video) {
//   if (!err) {
//     console.log('The video is ready to be processed', video);
//   } else {
//     console.log('Error: ' + err);
//   }
// })