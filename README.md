# React Native Training

Welcome to the React Native training! Please follow these instructions and you should have a green welcoming screen on your device or simulator. Good luck and contact me if you've run into problems!

## Development tools

For Mac users both Xcode and Android Studio is recommended. For other platforms Android Studio is your only choice.

### Prerequisites

- Node v10.10.0, other versions are not tested
- Lots of free space on disk
- Android Studio 3.1 - https://developer.android.com/studio/archive
- [Standalone React Dev Tools](https://github.com/facebook/react-devtools/tree/master/packages/react-devtools)
- macOS users only:
  - Xcode 9 or 10
  - Ruby
  - Cocoapods: `gem install cocoapods`

Install React Native development tools by following the [official getting started guide](https://facebook.github.io/react-native//docs/getting-started). Couple notes before you start:

- Select "Building Projects with Native Code" tab and select your OS and target.
- If you intalled Android Studio go a head and make sure you created the emulator as well:
  - https://facebook.github.io/react-native/docs/getting-started#preparing-the-android-device
- You do not need to run `react-native init AwesomeProject`. You can just clone this repository, instructions below.

**NOTE**: Linux users

- You may need to do some additional configuration depending on your distro and environment. Please use google and your Linux expertice to solve those. I have seen proof that this is doable on Linux! :)
- Some links that might help:
  - https://developer.android.com/studio/run/device
  - https://github.com/M0Rf30/android-udev-rules

## Get the training project running

Clone this repository to your local machine

```sh
git@github.com:jozan/react-native-training.git
```

Install JS dependencies for the app and start Metro Bundler

```sh
cd app
yarn
yarn start
```

Start the API server

```sh
cd server
yarn
yarn start
```

Run on iOS or Android

```
react-native run-ios
react-native run-android
```

**NOTE**: You may need to open Android emulator or connect an Android device since the packager may not be able to start it automatically.

**NOTE** macOS and Xcode 10 users:

- If you're using Xcode 10, the build doesn't work out of the box. Please open up `ios/RNTraining.xcodeproj` and change the build system setting to Legacy:
  - Xcode / File / Workspace Settings / Build system / select "Legacy Build System"

### Run on a physical device

Connect your device to your machine and get the list of connected devices

```sh
instruments -s devices # iOS devices
adb devices # Android devices
```

Deploy to the wanted device

```sh
react-native run-ios --device="DEVICE NAME"
react-native run-android --deviceId="DEVICE ID"
```

**NOTE** macOS users: If you want to deploy to a specific iOS simulator such as iPhone X you need to create that simulator first in Xcode / Window / Devices and Simulators / Simulators. To run the app in the newly created simulator run the following and refer to the simulator name which you can find using `instruments` command above.

```
react-native run-ios --simulator="iPhone X"
```

## Troubleshooting

**Debugging JS Remotely**

If you run into problems when debuggin JS remotely and your browser is opened to this address `http://10.0.2.2:8081/debugger-ui` (happens usually on Android) please open [`http://localhost:8081/debugger-ui`](http://localhost:8081/debugger-ui) and reload the app by pressing (R,R), CMD+R or CTRL+R

**error 500, index._._ not found, red screen etc**

- If on Android run `adb reverse tcp:8081 tcp:8081`
- If it did not help, stop packager, clean all React Native related caches and restart packager with a cache reset flag

```sh
watchman watch-del-all
rm -rf /tmp/metro-bundler-cache-*
rm -rf /tmp/haste-map-react-native-packager-*
yarn start --reset-cache
```
