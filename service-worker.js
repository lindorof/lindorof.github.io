/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "33bbfcde979e6ea0bff64cabed0bc91d"
  },
  {
    "url": "archives.html",
    "revision": "a91ebc0bfb31fac5724f22db59e9cdb2"
  },
  {
    "url": "assets/css/0.styles.8ac2847d.css",
    "revision": "be070b6954224e052d481319654dbbfe"
  },
  {
    "url": "assets/img/01-01.57895697.png",
    "revision": "57895697c4401317312d99befa54c024"
  },
  {
    "url": "assets/img/01-01.5b28c9cd.png",
    "revision": "5b28c9cd6660a8a0d0d316167e7c62f0"
  },
  {
    "url": "assets/img/01-02.4808fae5.png",
    "revision": "4808fae5b8e7c9a1fabbcc03728d9471"
  },
  {
    "url": "assets/img/01-02.d1a6a44f.png",
    "revision": "d1a6a44f5def278a2b37af2758a1376f"
  },
  {
    "url": "assets/img/01-03.b52a3447.png",
    "revision": "b52a34474bae1966ef8d1033c1521383"
  },
  {
    "url": "assets/img/01-04.3866bf82.png",
    "revision": "3866bf8272ebc65eeeb1ff218c17a64f"
  },
  {
    "url": "assets/img/01.3ca2a163.png",
    "revision": "3ca2a1633881c31c6c9b52c4f697f255"
  },
  {
    "url": "assets/img/01.5e6a34ec.jpg",
    "revision": "5e6a34ec1879381935f9f3e6d778d38b"
  },
  {
    "url": "assets/img/01.8d861973.png",
    "revision": "8d8619733e8f341689d513c1b6d8af32"
  },
  {
    "url": "assets/img/01.8f436573.jpg",
    "revision": "8f436573e11836c093b4af246666554d"
  },
  {
    "url": "assets/img/01.953ee518.jpg",
    "revision": "953ee518fb9f755090a6dfb4b3058061"
  },
  {
    "url": "assets/img/01.fcb1407b.jpg",
    "revision": "fcb1407b1fcf214338059effb9f9a74a"
  },
  {
    "url": "assets/img/02-01.870d72de.png",
    "revision": "870d72de0e1e819a76a014ad5de56da5"
  },
  {
    "url": "assets/img/02-02.167c56e2.png",
    "revision": "167c56e2a0dd3049f069f9725946ff39"
  },
  {
    "url": "assets/img/02-03.e6fd1f26.png",
    "revision": "e6fd1f269999be5e24d5dd09dd2b47c1"
  },
  {
    "url": "assets/img/02-04.a5f1a1d3.png",
    "revision": "a5f1a1d3393dcfd3322683b4adf78d90"
  },
  {
    "url": "assets/img/02-05.dacab58f.png",
    "revision": "dacab58f29bd94c8edf9694092cc9235"
  },
  {
    "url": "assets/img/02-06.9d92fabc.png",
    "revision": "9d92fabc6507e33d68c3e36643411d7f"
  },
  {
    "url": "assets/img/02.34d39735.jpg",
    "revision": "34d397358c13c15e2b413e6a72cdc619"
  },
  {
    "url": "assets/img/02.9e24b22e.jpg",
    "revision": "9e24b22eb0acc1f76433a0ca1b8809d8"
  },
  {
    "url": "assets/img/02.c2bfaf6d.jpg",
    "revision": "c2bfaf6db3063791be8005315ef4ba3d"
  },
  {
    "url": "assets/img/02.f4c1781f.png",
    "revision": "f4c1781f4e1666f8cc2c1cc32a4dd09d"
  },
  {
    "url": "assets/img/03-01.6825cbed.png",
    "revision": "6825cbed3d452a6fc5ca0a0dcf9b5d35"
  },
  {
    "url": "assets/img/03-01.8dd4a95a.png",
    "revision": "8dd4a95adbbaf6d0b9047f1d45940cea"
  },
  {
    "url": "assets/img/03.19f7d846.jpg",
    "revision": "19f7d84669b868795cc21cc72f104ea7"
  },
  {
    "url": "assets/img/03.36af45f2.jpg",
    "revision": "36af45f2c1cb63d4e4d596503ced8fff"
  },
  {
    "url": "assets/img/03.c29bf72b.png",
    "revision": "c29bf72bb039af832981921be9a9df31"
  },
  {
    "url": "assets/img/04-01.a29ab972.png",
    "revision": "a29ab9722f44b3f9c730c0fe5fd076eb"
  },
  {
    "url": "assets/img/04-02.de3320bd.png",
    "revision": "de3320bdd2b41cf7ece3db37aa85617d"
  },
  {
    "url": "assets/img/04.4d2f3132.png",
    "revision": "4d2f3132299fd70d8ede1e4e53d41e79"
  },
  {
    "url": "assets/img/04.b2f8637a.jpg",
    "revision": "b2f8637a4ed3427be7655fbfdb62a417"
  },
  {
    "url": "assets/img/05.e8d324f0.jpg",
    "revision": "e8d324f01a338db2df25cf084019f4f1"
  },
  {
    "url": "assets/img/06-01.8c2b8da7.png",
    "revision": "8c2b8da7460a94267a59fd7d8a84dd53"
  },
  {
    "url": "assets/img/06-02.07955164.png",
    "revision": "07955164481fa611a9eb557cae171069"
  },
  {
    "url": "assets/img/06-03.dd1a28a0.png",
    "revision": "dd1a28a0c497459847a312933bde1d36"
  },
  {
    "url": "assets/img/06.b07a5622.jpg",
    "revision": "b07a5622bdf1937191e5e2c3b696bc7f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.ee4568ff.js",
    "revision": "92c19353d082da3b5c18c8bff3b7792c"
  },
  {
    "url": "assets/js/11.8db0767a.js",
    "revision": "1eafda37d63a7ca77b14bdd198d8c39e"
  },
  {
    "url": "assets/js/12.92a4e660.js",
    "revision": "181d5c303ed904011ed05786c7323a04"
  },
  {
    "url": "assets/js/13.e2450b62.js",
    "revision": "5313d7980b95b63774bae855f2e6c0ca"
  },
  {
    "url": "assets/js/14.5ae14743.js",
    "revision": "dac775cacf319e4c4f9d8e413e5a04b9"
  },
  {
    "url": "assets/js/15.62a967cf.js",
    "revision": "6072610c436e713771875dd1c8127950"
  },
  {
    "url": "assets/js/16.3482df63.js",
    "revision": "08d01dbe10288a4e812c6f5ed39a6554"
  },
  {
    "url": "assets/js/17.881a9d91.js",
    "revision": "4a32695dba3acbd693aa6918e47770a3"
  },
  {
    "url": "assets/js/18.d6e19ee5.js",
    "revision": "113f657ad0c42da6d61ba9fe05512197"
  },
  {
    "url": "assets/js/19.caf0829a.js",
    "revision": "14ccf456929b64f50c4e3e62344a8c84"
  },
  {
    "url": "assets/js/2.5df156af.js",
    "revision": "6f2588bb0c5a4efd5b915f0667210419"
  },
  {
    "url": "assets/js/20.a80e123c.js",
    "revision": "647fe407f524aa5eccc029ef6696bfc9"
  },
  {
    "url": "assets/js/21.9c810086.js",
    "revision": "fdd562ba98fc91982b21ff4a30cfdc54"
  },
  {
    "url": "assets/js/22.bc5f69cb.js",
    "revision": "56dac93471506fa1a6dfba8ad90f79cb"
  },
  {
    "url": "assets/js/23.f15ef55d.js",
    "revision": "2927f5c998843228eadc3eda52dcdb9f"
  },
  {
    "url": "assets/js/24.b8714e3e.js",
    "revision": "a2e5d41e9189884774dfb26d9919d272"
  },
  {
    "url": "assets/js/25.d673c092.js",
    "revision": "e2ff0dd2f4416eb01e420eeefc3fb8a7"
  },
  {
    "url": "assets/js/26.28d57b84.js",
    "revision": "916176fe70b9b48d4a98a29d0d75f908"
  },
  {
    "url": "assets/js/27.d8b15b76.js",
    "revision": "749480bc00a69d695d3c44e952fbdbec"
  },
  {
    "url": "assets/js/28.2574be13.js",
    "revision": "98eb238c6544b440ea83159698e1c9ed"
  },
  {
    "url": "assets/js/29.54667d47.js",
    "revision": "321a707687fe3e6b2a81e8bdd49ae759"
  },
  {
    "url": "assets/js/3.f6602695.js",
    "revision": "2e77278d2519e883d724609cd49b3cbe"
  },
  {
    "url": "assets/js/30.dd697263.js",
    "revision": "50af04484527e39f3617b3355fa9cfe9"
  },
  {
    "url": "assets/js/31.aafbc8db.js",
    "revision": "c096ab61e1da20e6dd766b10c9b0c2e3"
  },
  {
    "url": "assets/js/32.5fe2531d.js",
    "revision": "de7dc1f24b17f59b8b24c53632bef098"
  },
  {
    "url": "assets/js/33.c3dfca3c.js",
    "revision": "da3efd9717f39e69c33978cdeb05f446"
  },
  {
    "url": "assets/js/34.22613e38.js",
    "revision": "9dc970365533e24904500e4290f88110"
  },
  {
    "url": "assets/js/35.aad9af2b.js",
    "revision": "6317a2e75ffb17daf0778ecad70ba111"
  },
  {
    "url": "assets/js/36.badbd522.js",
    "revision": "215d2c57f644f8de33c2aa21cdfc5283"
  },
  {
    "url": "assets/js/37.45905373.js",
    "revision": "ac2a19db68a266c083c4ef561b6f0d2a"
  },
  {
    "url": "assets/js/38.ab0de43e.js",
    "revision": "1087f978cf28044804b28991c01f7457"
  },
  {
    "url": "assets/js/39.d1a7492c.js",
    "revision": "8d7b0c0dfbbb6a95e67c10ce654e92e4"
  },
  {
    "url": "assets/js/4.c7710dca.js",
    "revision": "4eeba5b452222f2c0dd520fec9112bc2"
  },
  {
    "url": "assets/js/40.92c4cb14.js",
    "revision": "4a46c9cbd6bc771cc2d4deea4faad3f1"
  },
  {
    "url": "assets/js/41.cc19be50.js",
    "revision": "ca5a9b3e836fe2ea27b7b146c5fb9e76"
  },
  {
    "url": "assets/js/42.c9b4b585.js",
    "revision": "738e946586fd847b7686ff4c5c413335"
  },
  {
    "url": "assets/js/43.1af966c8.js",
    "revision": "7bc025952124a81b03ae63c644f528e2"
  },
  {
    "url": "assets/js/44.40ebac1c.js",
    "revision": "813e34a2e16338adee6e6ba260060ad3"
  },
  {
    "url": "assets/js/45.469b8553.js",
    "revision": "97e53613b50ef873186e6cd5569bc4cd"
  },
  {
    "url": "assets/js/46.eb491d21.js",
    "revision": "f54e15d66ced268c32b6066249fa2b66"
  },
  {
    "url": "assets/js/47.03d1fbf2.js",
    "revision": "c7ba322c6d7ea5722291d2cf020e51cd"
  },
  {
    "url": "assets/js/48.af296c16.js",
    "revision": "9305e2882519e73d88a0ffee855d9b54"
  },
  {
    "url": "assets/js/49.3a42b55b.js",
    "revision": "93a39b83858202f83144f83265d36c3b"
  },
  {
    "url": "assets/js/5.339eb2f5.js",
    "revision": "9ecf253b17c3a5d77544ec96409f3d3b"
  },
  {
    "url": "assets/js/50.ef35a161.js",
    "revision": "7bb749d57649455ee111b2f3db7327da"
  },
  {
    "url": "assets/js/51.284d50de.js",
    "revision": "c0bf76b79e6ceab418f46e6fccdd0902"
  },
  {
    "url": "assets/js/52.c4983004.js",
    "revision": "6e7a0946fbd1ff420cf4809fe3d29673"
  },
  {
    "url": "assets/js/53.83c193e1.js",
    "revision": "1afce3241ab102d2e565634243d83171"
  },
  {
    "url": "assets/js/54.08f26cd6.js",
    "revision": "66c45850c9a3afff4990393dad5f7bbc"
  },
  {
    "url": "assets/js/55.ef20313b.js",
    "revision": "8f24d2ab723e36302c7975d9d6e174bf"
  },
  {
    "url": "assets/js/56.dc2772cf.js",
    "revision": "9407898b0a8a372f9181f0a63a867d23"
  },
  {
    "url": "assets/js/57.add26447.js",
    "revision": "409da1534a9b193400f60f3524d1aa1b"
  },
  {
    "url": "assets/js/58.ff8f2704.js",
    "revision": "7254bc55a2a76c08823fc5b1b03609e4"
  },
  {
    "url": "assets/js/59.43fdbc04.js",
    "revision": "deaeb06ff5a7a5992a9bfd1694afb0bf"
  },
  {
    "url": "assets/js/6.0ce72a94.js",
    "revision": "a0b779842853357655f36a9246c71ee8"
  },
  {
    "url": "assets/js/60.1a27c7c3.js",
    "revision": "d0986862a0436e555fd65614b7aeb59c"
  },
  {
    "url": "assets/js/61.9ca63ff6.js",
    "revision": "550a3d09d5faa7d4af9cbd4f9790ae46"
  },
  {
    "url": "assets/js/62.9ab09b12.js",
    "revision": "10a8b6f370413ce1fab8262db61bcba9"
  },
  {
    "url": "assets/js/63.a6b6d595.js",
    "revision": "87f0418ccdd037b828591a351cc824ad"
  },
  {
    "url": "assets/js/64.5e9ac56b.js",
    "revision": "c6d64f7d0797bc50bcf184d4eaccebc2"
  },
  {
    "url": "assets/js/65.bcfb6015.js",
    "revision": "b3d62379de11ddd4c40c84834b5c8302"
  },
  {
    "url": "assets/js/66.5024eb22.js",
    "revision": "54891734482e11af85f5cd0256ccc1b8"
  },
  {
    "url": "assets/js/67.5d83f99f.js",
    "revision": "3b3a8636e2683906257c6b2db7395aca"
  },
  {
    "url": "assets/js/68.80f05874.js",
    "revision": "b28a7b9a9a0c6214072c4cb16ad6e39f"
  },
  {
    "url": "assets/js/69.6f9ff293.js",
    "revision": "00ea51015134e2757e6898204312b28e"
  },
  {
    "url": "assets/js/7.726c7fbf.js",
    "revision": "45067089b32093eebf304a68ba8302f2"
  },
  {
    "url": "assets/js/70.92b749fb.js",
    "revision": "65e15bc4c303ef270194dd513c972b48"
  },
  {
    "url": "assets/js/71.a4248217.js",
    "revision": "f1881b30bb42cbedd3bf5bfe4991a5fb"
  },
  {
    "url": "assets/js/72.29aeb940.js",
    "revision": "5a766bf78fad4ff11f29960ff77239a3"
  },
  {
    "url": "assets/js/73.8918e90b.js",
    "revision": "6388293588dfebfad98becc57b5e8672"
  },
  {
    "url": "assets/js/74.81fd32da.js",
    "revision": "1d75f470d2855eab7bb6c9397ddb8cf0"
  },
  {
    "url": "assets/js/75.5357ccc2.js",
    "revision": "44616a9bad7c68180c4fc54b236198b2"
  },
  {
    "url": "assets/js/76.66fc1725.js",
    "revision": "b4c5c87fb3ef9ba283ed8b85af79f150"
  },
  {
    "url": "assets/js/77.6f29512b.js",
    "revision": "d60be1f501de2603be5338e97c46cad3"
  },
  {
    "url": "assets/js/78.a63871cd.js",
    "revision": "ed095f3de7254039f185b55c76e20d6e"
  },
  {
    "url": "assets/js/79.c646997c.js",
    "revision": "72b3e5931c6a389dad1f7c60b7effefe"
  },
  {
    "url": "assets/js/8.81d630fc.js",
    "revision": "92e45d8dba41aeed611712931d28fc91"
  },
  {
    "url": "assets/js/80.b5d5ad39.js",
    "revision": "eecfe61c8e659d36224397ded5a2aa40"
  },
  {
    "url": "assets/js/81.601aa569.js",
    "revision": "4ff6cb12af1fbbb5f619f5a670bfb147"
  },
  {
    "url": "assets/js/82.99bc0640.js",
    "revision": "6dbf6a9b73917855fa8ded6bcab7bde4"
  },
  {
    "url": "assets/js/83.06d4defc.js",
    "revision": "1a621257335288f0a7f3e5453b891bc5"
  },
  {
    "url": "assets/js/84.44856307.js",
    "revision": "a84d7a377c8d786e29a9944e29a70d5a"
  },
  {
    "url": "assets/js/85.3b88ee80.js",
    "revision": "aa2ddd5dadf9c63759a26a9bed4b5ff6"
  },
  {
    "url": "assets/js/86.47c806cb.js",
    "revision": "e88316d08dbd7be6cdc94bbe31554d29"
  },
  {
    "url": "assets/js/87.b5201cdf.js",
    "revision": "b7789e61cf73a00a41268f47c4cbb463"
  },
  {
    "url": "assets/js/88.f9ce8655.js",
    "revision": "301ec1c7182d1c163665885997cd7d73"
  },
  {
    "url": "assets/js/89.c1f12bf1.js",
    "revision": "61c3ba0ff956796d627a9a89e4e43dbf"
  },
  {
    "url": "assets/js/9.b6118830.js",
    "revision": "b1b842a0479ee3b825c483115a26a709"
  },
  {
    "url": "assets/js/90.e0f850a2.js",
    "revision": "98b1ad56c25c605b81a4467bc69d7aa3"
  },
  {
    "url": "assets/js/91.8166ca11.js",
    "revision": "e7ef415994c7c98abf49d8c31d15be1c"
  },
  {
    "url": "assets/js/92.6ba6ce27.js",
    "revision": "8250983529363b4523875f27c5927a04"
  },
  {
    "url": "assets/js/93.6e09fb58.js",
    "revision": "f84384676f6c70a388b0797611ba1cf1"
  },
  {
    "url": "assets/js/94.1b324565.js",
    "revision": "0e144cabab5fe8c61d460b22a3b6248f"
  },
  {
    "url": "assets/js/95.5308659f.js",
    "revision": "d05e4537b45c4f50e3462bed3b4155f6"
  },
  {
    "url": "assets/js/96.306bee11.js",
    "revision": "81b1dceb022ba1286174e3c512b3a9f0"
  },
  {
    "url": "assets/js/97.6e231fca.js",
    "revision": "1db9cbd495f3b2becde6971724b85701"
  },
  {
    "url": "assets/js/app.b639eb72.js",
    "revision": "8af9709779814152187ff07c70c73fc6"
  },
  {
    "url": "C++/VC编译/C&C++程序运行时库.html",
    "revision": "112fcb6329b57e5bdb0aab41846c47dd"
  },
  {
    "url": "C++/VC编译/函数调用约定与函数导出.html",
    "revision": "c13ad3f95832319209df62e3d4326dd6"
  },
  {
    "url": "C++/学习心得/从内存模型分析C++的面向对象机制.html",
    "revision": "7022c4c9d71fe8b84e7db050fc3afeac"
  },
  {
    "url": "C++/学习心得/多维数组&多维指针.html",
    "revision": "6acf36442818b8c3eb8ff398c93e172f"
  },
  {
    "url": "C++/学习心得/对象切片的构造与析构法则.html",
    "revision": "d243c618c119a28a553f81fba98a0e21"
  },
  {
    "url": "C++/学习心得/拷贝构造函数.html",
    "revision": "cf788045e77f1c5b021ac5e6f210d1d3"
  },
  {
    "url": "DotNet/WinForm/WinForm多线程剖析.html",
    "revision": "60b13219fe2ee20d06ba8d10b5f72de9"
  },
  {
    "url": "DotNet/学习心得/DotNet搜索DLL的方式.html",
    "revision": "3df231fb1c8caf82ce814503d8654496"
  },
  {
    "url": "guide.html",
    "revision": "cff370148dd608eda97293bfef0dde1e"
  },
  {
    "url": "icon/icon-120x120.png",
    "revision": "960c75a8dd752486b026549747a527ce"
  },
  {
    "url": "img/logo.jpg",
    "revision": "4402c85c1843169ad55937501ee31bb3"
  },
  {
    "url": "index.html",
    "revision": "f17ec281ac0a06182038ba2761e84ad9"
  },
  {
    "url": "libuv/libuv-queue-学习心得.html",
    "revision": "85141c43a5fcabe09139874165c0e0b0"
  },
  {
    "url": "libuv/libuv-安装编译.html",
    "revision": "df0fa71a697365e885c79b1a00ff2d4a"
  },
  {
    "url": "Qt/Qt-for-macOS.html",
    "revision": "6e222a04d10601c59887353bb4df6be6"
  },
  {
    "url": "Rust/Rust_Book_Exp/01 Getting Started/01 Getting Started.html",
    "revision": "1d3149f0bf6c46f136290c6990d93dd2"
  },
  {
    "url": "Rust/Rust_Book_Exp/02 Programming a Guessing Game/01 Programming a Guessing Game.html",
    "revision": "d0ef21552b97a86675c7cd319d38aeae"
  },
  {
    "url": "Rust/Rust_Book_Exp/03 Common Programming Concepts/01 Variables and Mutability.html",
    "revision": "d0d8164464a0c233abbe831f5df42448"
  },
  {
    "url": "Rust/Rust_Book_Exp/03 Common Programming Concepts/02 Data Types.html",
    "revision": "b93fc49178a23a5711a7d83f2a9ab113"
  },
  {
    "url": "Rust/Rust_Book_Exp/03 Common Programming Concepts/03 How Functions Work.html",
    "revision": "521d4a3a24f58175e40e21c51cf62aa3"
  },
  {
    "url": "Rust/Rust_Book_Exp/03 Common Programming Concepts/04 Comments.html",
    "revision": "1853ea1af3cd5c432b7b3cb74acccc29"
  },
  {
    "url": "Rust/Rust_Book_Exp/03 Common Programming Concepts/05 Contrl Flow.html",
    "revision": "07dfbadea5b737c1b2ad3544c58bc0c5"
  },
  {
    "url": "Rust/Rust_Book_Exp/04 Understanding Ownership/01 What is Ownership.html",
    "revision": "9c12756fbe2b517cc9ae291cd9f6d949"
  },
  {
    "url": "Rust/Rust_Book_Exp/04 Understanding Ownership/02 References and Borrowing.html",
    "revision": "b4179f43fc7c0339881848e617588510"
  },
  {
    "url": "Rust/Rust_Book_Exp/04 Understanding Ownership/03 Slices.html",
    "revision": "3486719d90c804efe06ff1a23e5247f9"
  },
  {
    "url": "Rust/Rust_Book_Exp/05 Using Structs to Structure Related Data/01 Defining and Instantiating Structs.html",
    "revision": "e588f3574997b958bfc95a7002c0f759"
  },
  {
    "url": "Rust/Rust_Book_Exp/05 Using Structs to Structure Related Data/02 An Example Program Using Structs.html",
    "revision": "12005400bfee70b2197eb6ffeb38ee98"
  },
  {
    "url": "Rust/Rust_Book_Exp/05 Using Structs to Structure Related Data/03 Method Syntax.html",
    "revision": "4eff832a500ee157463da859ae2294fd"
  },
  {
    "url": "Rust/Rust_Book_Exp/06 Enums and Pattern Matching/01 Defining an Enum.html",
    "revision": "8155e628d539f32fa385eac4a06aa159"
  },
  {
    "url": "Rust/Rust_Book_Exp/06 Enums and Pattern Matching/02 The Match Control Flow Operator.html",
    "revision": "8937a30cbc76d3fdd368b7078716736e"
  },
  {
    "url": "Rust/Rust_Book_Exp/06 Enums and Pattern Matching/03 Concise Control Flow with if let.html",
    "revision": "005674ab4f0b658035525b05c74bde5e"
  },
  {
    "url": "Rust/Rust_Book_Exp/07 Modules/01 mod and the Filesystem.html",
    "revision": "5c439f416733a32e435f5f626de4ea58"
  },
  {
    "url": "Rust/Rust_Book_Exp/07 Modules/02 Controlling Visibility with pub.html",
    "revision": "34c4ba1178d19edc3edabfa32d6a112c"
  },
  {
    "url": "Rust/Rust_Book_Exp/07 Modules/03 Referring to Names in Different Modules.html",
    "revision": "dd701aee1bbfdff4b5599d7bf461428a"
  },
  {
    "url": "Rust/Rust_Book_Exp/08 Common Collections/01 Vectors.html",
    "revision": "1ab6f0f60df5bc83670e97f0e755fceb"
  },
  {
    "url": "Rust/Rust_Book_Exp/08 Common Collections/02 Strings.html",
    "revision": "ae8783a69d32faf766d869508a487fc4"
  },
  {
    "url": "Rust/Rust_Book_Exp/08 Common Collections/03 Hash Maps.html",
    "revision": "a3a452e6561bc12a6a9a46374695323c"
  },
  {
    "url": "Rust/Rust_Book_Exp/08 Common Collections/04 Ownership about Collections.html",
    "revision": "ab3ee7209a04b84fdeb1c8a89d48ecbc"
  },
  {
    "url": "Rust/Rust_Book_Exp/09 Error Handling/00 Foreword.html",
    "revision": "ebe18387555348a1d514c12cf3d4084c"
  },
  {
    "url": "Rust/Rust_Book_Exp/09 Error Handling/01 Unrecoverable Errors with panic.html",
    "revision": "7d01636251eff791f07e877dda7d21bb"
  },
  {
    "url": "Rust/Rust_Book_Exp/09 Error Handling/02 Recoverable Errors with Result.html",
    "revision": "3e19590a6cac26571109847e4046cc51"
  },
  {
    "url": "Rust/Rust_Book_Exp/09 Error Handling/03 To panic or Not to panic.html",
    "revision": "c26b852be1bf3eaf29b358c485b65528"
  },
  {
    "url": "Rust/Rust_Book_Exp/10 Generic Types and Traits and Lifetimes/00 Foreword.html",
    "revision": "73247e5810d904d3e913d1210e812351"
  },
  {
    "url": "Rust/Rust_Book_Exp/10 Generic Types and Traits and Lifetimes/01 Generic Data Types.html",
    "revision": "75f26dd7d3576ac1d42583d668fd17dc"
  },
  {
    "url": "Rust/Rust_Book_Exp/10 Generic Types and Traits and Lifetimes/02 Traits of Defining Shared Behavior.html",
    "revision": "1075d2246c7ae0ef769f413bfe162fa7"
  },
  {
    "url": "Rust/Rust_Book_Exp/10 Generic Types and Traits and Lifetimes/03 Validating References with Lifetimes.html",
    "revision": "16b9e72081df5bac6f560adff25bd5fe"
  },
  {
    "url": "Rust/Rust_Book_Exp/10 Generic Types and Traits and Lifetimes/04 Thinking in Lifetimes.html",
    "revision": "80759e6a5711000c8520b3d27c9b1e12"
  },
  {
    "url": "Rust/Rust_Book_Exp/11 Writing Automated Tests/00 Foreword.html",
    "revision": "de17d1d5e910146c597e4c1b3dc194c8"
  },
  {
    "url": "Rust/Rust_Book_Exp/11 Writing Automated Tests/01 How to Write Tests.html",
    "revision": "201a517f1657bfa1447219103d32cacc"
  },
  {
    "url": "Rust/Rust_Book_Exp/11 Writing Automated Tests/02 Controlling How Tests Are Run.html",
    "revision": "3d31117a8984bc356e40a8376c9bf3f6"
  },
  {
    "url": "Rust/Rust_Book_Exp/11 Writing Automated Tests/03 Test Organization.html",
    "revision": "481a501f0af8ac5c3e283f65a5a0a234"
  },
  {
    "url": "Rust/Rust_Book_Exp/11 Writing Automated Tests/04 Example for Integration Test.html",
    "revision": "caa41a74cda5c37066be41f5ac60cd1f"
  },
  {
    "url": "Rust/Rust_Book_Exp/12 A Command Line Tool/00 Foreword.html",
    "revision": "775c82d2984391c1bcdc1523c62fa455"
  },
  {
    "url": "Rust/Rust_Book_Exp/12 A Command Line Tool/01 Accepting Command Line Arguments.html",
    "revision": "2cdc7c6f4496b58cd60b544faf6d10c4"
  },
  {
    "url": "Rust/Rust_Book_Exp/12 A Command Line Tool/02 Reading a File.html",
    "revision": "699cc393f11018b48f2324adc980a6bb"
  },
  {
    "url": "Rust/Rust_Book_Exp/12 A Command Line Tool/03 Refactoring to Improve Modularity and Error Handling.html",
    "revision": "74c678f940689ca71c67808183f8b8fb"
  },
  {
    "url": "Rust/Rust_Book_Exp/12 A Command Line Tool/04 Test Driven Development.html",
    "revision": "dc77f633f3d15995da83348e955571f0"
  },
  {
    "url": "Rust/Rust_Book_Exp/12 A Command Line Tool/05 Working with Environment Variables.html",
    "revision": "a46adbd1e70390df03cad9ed924d475b"
  },
  {
    "url": "Rust/Rust_Book_Exp/12 A Command Line Tool/06 Standard Output and Standard Error.html",
    "revision": "cbc53053f36152cee5fe7b0c25f6b76e"
  },
  {
    "url": "Rust/Rust_Book_Exp/12 A Command Line Tool/07 Appendix.html",
    "revision": "5caa8ad41e6c7d9c32bb1a14fd8dabde"
  },
  {
    "url": "Rust/Rust_Book_Exp/13 Functional Programming about Closure and Iterator/01 Closures that Anonymous Functions can Capture their Environment.html",
    "revision": "0aaf98cc52af56b4c380f08b3fed4092"
  },
  {
    "url": "Rust/Rust_Book_Exp/13 Functional Programming about Closure and Iterator/02 Processing a Series of Items with Iterators.html",
    "revision": "0a0e31c9d4e48e8c2d6022d24b11bfe9"
  },
  {
    "url": "Rust/Rust_Book_Exp/13 Functional Programming about Closure and Iterator/03 Improving Our IO Project.html",
    "revision": "9deb7f5b4f7c3c57c80a480e0f7ad770"
  },
  {
    "url": "Rust/Rust_Book_Exp/13 Functional Programming about Closure and Iterator/04 Comparing Performance about Loop and Iterator.html",
    "revision": "917d7f85aa9afe50522ed7131a80bdf5"
  },
  {
    "url": "Rust/Rust_Book_Exp/14 More about Cargo and Crates.io/01 Customizing Builds with Release Profiles.html",
    "revision": "672730815fee27cb17184fbf5cf9aecf"
  },
  {
    "url": "Rust/Rust_Book_Exp/14 More about Cargo and Crates.io/02 Publishing a Crate to Crates.io.html",
    "revision": "664e8233f80d922d6b57c9345bf278f3"
  },
  {
    "url": "Rust/Rust_Book_Exp/14 More about Cargo and Crates.io/03 Cargo Workspaces.html",
    "revision": "2251de502ab0bdaee710ea0e56881fcc"
  },
  {
    "url": "Rust/Rust_Book_Exp/14 More about Cargo and Crates.io/04 Installing Binaries from Crates.io with cargo install.html",
    "revision": "e7f0a23ffa9b5a363c72a6121c54fc6e"
  },
  {
    "url": "Rust/Rust_Book_Exp/14 More about Cargo and Crates.io/05 Extending Cargo with Custom Commands.html",
    "revision": "fa04579905e705757b7af83289aeed32"
  },
  {
    "url": "Rust/Rust_Book_Exp/15 Smart Pointers/00 Foreword.html",
    "revision": "00c23b0b4576cf403bea4de547fd66bb"
  },
  {
    "url": "Rust/Rust_Book_Exp/15 Smart Pointers/01 Using Box to Point to Data on the Heap.html",
    "revision": "511e84dca60961c81077fd0f5aa566e2"
  },
  {
    "url": "Rust/Rust_Book_Exp/15 Smart Pointers/02 Treating Smart Pointers Like Regular References with the Deref Trait.html",
    "revision": "bf1d1513c15db554b568786e4bb36de1"
  },
  {
    "url": "Rust/Rust_Book_Exp/15 Smart Pointers/03 Running Code on Cleanup with the Drop Trait.html",
    "revision": "35c7d22d35fae93138f71df8ef1be107"
  },
  {
    "url": "Rust/Rust_Book_Exp/15 Smart Pointers/04 Rc the Reference Counted Smart Pointer.html",
    "revision": "d006d07716f872f304e578d185e88148"
  },
  {
    "url": "Rust/Rust_Book_Exp/15 Smart Pointers/05 RefCell and the Interior Mutability Pattern.html",
    "revision": "29b71b4083c9f386449ddfe7032270a5"
  },
  {
    "url": "Rust/Rust_Book_Exp/15 Smart Pointers/06 Reference Cycles Can Leak Memory.html",
    "revision": "4797dfb7862f9d956c4d4c3240b69533"
  },
  {
    "url": "Rust/Rust_Book_Exp/16 Fearless Concurrency/00 Foreword.html",
    "revision": "4e6af155468e044320acdf90c5442ef1"
  },
  {
    "url": "Rust/Rust_Book_Exp/16 Fearless Concurrency/01 Using Threads to Run Code Simultaneously.html",
    "revision": "746c8ac664930b4a388e66da5cdd25b2"
  },
  {
    "url": "Rust/Rust_Book_Exp/16 Fearless Concurrency/02 Using Message Passing to Transfer Data Between Threads.html",
    "revision": "453ae7162864201e028db7d4658dcb12"
  },
  {
    "url": "Rust/Rust_Book_Exp/16 Fearless Concurrency/03 Shared State Concurrency.html",
    "revision": "cdb7ff9bc6dbf398a6e4595c0ff04575"
  },
  {
    "url": "Rust/Rust_Book_Exp/16 Fearless Concurrency/04 Extensible Concurrency with the Sync and Send Traits.html",
    "revision": "e5cf00c8a238052ca556d1f1a863d9d1"
  },
  {
    "url": "Rust/Rust_Book_Exp/17 Object Oriented Programming Features of Rust/01 Characteristics of Object Oriented Languages.html",
    "revision": "00d1b53095c3ae49f36b2f7e0927b8b6"
  },
  {
    "url": "Rust/Rust_Book_Exp/17 Object Oriented Programming Features of Rust/02 Using Trait Objects That Allow for Values of Different Types.html",
    "revision": "70faaaf32631f2dd3b9517b8c70ef8f7"
  },
  {
    "url": "Rust/Rust_Book_Exp/17 Object Oriented Programming Features of Rust/03 Implementing an Object-Oriented Design Pattern.html",
    "revision": "e630d35d3617e22b262818edc7954f67"
  },
  {
    "url": "Rust/Rust_Book_Exp/18 Patterns and Matching/01 All the Places Patterns Can Be Used.html",
    "revision": "e748759a16418b6518de8d35aad8a191"
  },
  {
    "url": "Rust/Rust_Book_Exp/18 Patterns and Matching/02 Refutability Whether a Pattern Might Fail to Match.html",
    "revision": "98df93388926ad527e7325279efa4f00"
  },
  {
    "url": "Rust/Rust_Book_Exp/18 Patterns and Matching/03 Pattern Syntax.html",
    "revision": "42ec5fd2f1b76dd298c45b2c40fcf894"
  },
  {
    "url": "Rust/Rust_Book_Exp/19 Advanced Features/01 Unsafe Rust.html",
    "revision": "92ddeb9cf0b771710fd9a2c71bfa71f3"
  },
  {
    "url": "Rust/Rust_Book_Exp/19 Advanced Features/02 Advanced Traits.html",
    "revision": "67aa0dec30d79b83097514f27ec7bf91"
  },
  {
    "url": "Rust/Rust_Book_Exp/index.html",
    "revision": "6e1a968666f96faa42764484213496b0"
  },
  {
    "url": "碎片/字符编码方式.html",
    "revision": "4c055b2ec2be4f0585dd222041979b2b"
  },
  {
    "url": "网络编程/UNIX网络IO模型.html",
    "revision": "7f033fb0591a8f01e60840d77719130b"
  },
  {
    "url": "网络编程/网络编程概念汇总.html",
    "revision": "521a86ff713c9292f82496e3b484436b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
