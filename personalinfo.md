#

###

#### Flexbox 簡介

* column
* row

#### 本頁面使用到的 Flexbox 的設定

`justifyContent`

`alignItems`

`alignSelf`

`flex: 1`

#### 把畫面撐開與 parent 同高

ReactNative 預設 Flexbox 的 direction 為 `column`

| parent 的 flexDirection 為 column         | parent 的 flexDirection 為 row 時 |
| :---------------------------------------- | :-------------------------------- |
| child 設置 flex: 1 把高度撐得 parent 同高 | flex: 1 把寬度撐得與 parent 同寬  |

### StyleSheet

```
import { StyleSheet } from 'react-native'

const styles = StylesSheet.create({
container: {
flex: 1
}
})
```

* 使用目的：因為使用 ID 參照，所以可以降低每次產生相同 style object 的 overhead

####

### View 元件

* 預設本身無任何畫面與佔用任何空間\(除非明確指定寬高或設定`{flex: 1}`\)，作為其餘畫面元件的容器，效果如同 web 上的 `<div>`

* 在畫面佔用空間的大小與容器中的佔用空間有關

* ```
  <View>
  <Text style={{width: 20, height: 20}}></Text>
  </View>
  ```

````
* 可以使用`{flex: 1}`將其撐得與parent 同高與同寬，下面例子裡面的view 的 高為100 但寬還是 0 \(沒指定預設`flexDirection: 'column'`\)

* ```
<View style={{width: 100, height: 100}}>
<View style={{flex: 1}} />
</View>
````

####

### Image 元件

* resizeMode

* stretch \| cover \| contain
* 後兩者在不改變圖片本身比例的情況下，對圖片跟他的設定的大小`width`, `height` 做適當的處理
* cover :無論圖片大小，讓圖片撐滿所設定的寬高，並且保留比例\(所以圖片比例跟設定的寬高比例不同會被裁切\)

* contain: 無論圖片大小，讓圖片置於所設定的寬高中，並且保留比例\(所以圖片若比例不同不會被裁切\)

<img src="/assets/螢幕快照 2018-06-04 下午12.20.12.jpg" width="200" height="200" />

* source

* 網路資源使用 uri 對 `<Image source={{uri: http://|file:// }} />`
* 靜態資源直接使用 source , `<Image source={require('./test.png)} />`

* style

* 設定圖片本身的寬高 與 其他 Layout Props
* [https://facebook.github.io/react-native/docs/layout-props.html](https://facebook.github.io/react-native/docs/layout-props.html)

* blurRadius

* 設定模糊程度
* 數字越大越模糊

\[blurRadius\] \([https://facebook.github.io/react-native/docs/image.html\#blurradius\](https://facebook.github.io/react-native/docs/image.html#blurradius%29\)

```
<Image style={styles.cover} blurRadius={5} resizeMode="cover" source={cover} />
```

常見技巧

* Avatar

```
const styles = StyleSheet.create({
image: {
borderRadius: 20,
width: 40,
height: 40
}
})

...
<Image style={styles.image} source={require('./some-image.png')} resizeMode='cover' />
```

* 全螢幕背景

```
const styles = StyleSheet.create({
image: {
position: 'absolute',
top: 0,
left: 0,
bottom: 0,
right: 0
},
container: {
flex: 1
}
})

...
<View style={styles.container}>
<Image style={styles.image} resizeMode='cover' source={require('./some-image.png')} />
</View>
```

###

### TextInput 元件

* `onChangeText`接收使用者每次輸入的字元

* `onSubmitEditing`當 virtual keyboard 的 returnKey 觸發時

* `returnKeyType` 設定 returnKey 在 virtual keyboard 上的長相

* `value`TextInput 當前再輸入框顯示的字串

* `blurOnSubmit`是否要讓元件在 submit 後失去焦點

* 其他

* * TextInput focus -&gt; virtual Keyboard Up
* * TextInput blur -&gt; virtual keyboard down

#### 將背景墊在所有元件，並設定該背景寬高與螢幕大小相同

```
const styles = StyleSheet.create({
cover: {
position: 'absolute',
top: 0,
left: 0,
right: 0,
bottom: 0
},
container: {
flex: 1
}
})
```

```
<View style={styles.container}>
<Image style={styles.cover} source={cover} />
{// ...其餘要放置在該圖片上的元件}
</View>
```

#### 設定 TextInput 輸入完畢後按下鍵盤跳至下一個輸入項

取得下一個輸入項的 ref，並在按下鍵盤的 returnKey 時，在`onSubmitEditing`中呼叫下一個輸入項的 ref 來達到此效果

使用`blurOnSubmit`屬性避免鍵盤閃爍的情況發生

若使用 `Genymotion` 要把 virtual keyboard 打開才有鍵盤可以用

```
render(){
return (
<View>
<TextInput
onChangeText={this.fillForm('address')}
style={formInputStyle}
value={form.address}
returnKeyType="next"
ref={(ref) => {
this.addressRef = ref;
}}
onSubmitEditing={() => {
this.telRef.focus();
}}
blurOnSubmit={false}
/>
<TextInput
onChangeText={this.fillForm('tel')}
style={formInputStyle}
value={form.tel}
ref={(ref) => {
this.telRef = ref;
}}
/>
</View>
)
}
```

#### 取消 android 上平台原生的輸入匡底線

使用`underlineColorAndroid`為`transparent`或是自定義的顏色

####

#### 使用 Inspector 查看元素邊界

打開 Developer Menu，選擇 Toggle Inspector 然後點選想要查看的元素

####

#### 製作 Avatar 輸入 與拍照 Icon

使用`react-native-vector-icons` 中 [fontawesome](https://fontawesome.com/icons?d=gallery&q=photo) 的 `camera` icon

```
import Icon from 'react-native-vector-icons/FontAwesome';

...

<Icon name="camera" size={30} />
```

製作圓形的 Image，將 borderRadius 設為 寬高的一半，然後寬高必須等值

```
const styles = StyleSheet.create({
avatar: {
width: 128,
height: 128,
borderRadius: 64,
},
})

<Image style={styles.avatar} resizeMode="cover" source={emptyAvatar} />
```

將 camera icon 疊在 avatar 的上方，

* Avatar 設為 position:absolute 使得之後的 icon 元素可以疊在上面
* 將 Avatar 與 Icon 包裹在一個 cameraContainer 父容器中，並固定一個寬高值
* 然後使用 `justityContent` 與 `alignSelf` 分別調整 camera icon 的位置

```
const styles = Stylesheet.create({
cameraContainer: {
width: 300,
height: 150,
justifyContent: 'flex-end'
},
avatar: {
width: 128,
height: 128,
alignSelf: 'center',
borderRadius: 64,
borderColor: 'white',
borderWidth: 2,
position: 'absolute'
},
cameraIcon: {
alignSelf: 'flex-end',
width: 100
},
})

<View style={styles.cameraContainer}>
<Image style={styles.avatar} resizeMode="cover" source={emptyAvatar} />
<Icon style={styles.cameraIcon} name="camera" size={30} />
</View>
```

#### 使用 RNCamera

[https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md](https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md)

* 製作 Camera 頁面
* 客製化拍照按鈕
*
