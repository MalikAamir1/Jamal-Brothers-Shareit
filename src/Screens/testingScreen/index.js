import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View, Button} from 'react-native';
import QuillEditor, {QuillToolbar} from 'react-native-cn-quill';
export default function TestingScreen() {
  const _editor = React.createRef();
  const [text, setText] = useState('');

  const setData = () => {
    _editor.current.dangerouslyPasteHTML('<h1>New Text</h1>');
    console.log('btn working');
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="auto" />
      <View style={{height: 480}}>
        <QuillToolbar editor={_editor} options="full" theme="light" />
        <QuillEditor
          style={styles.editor}
          ref={_editor}
          initialHtml={text}
          onTextChange={res => {
            console.log('text:', res);
          }}
          onHtmlChange={res => {
            console.log('HtmlChange:', res);
          }}

          // onSelectionChange
        />
      </View>
      <Button title="Btn" onPress={setData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: 'white',
  },
});
