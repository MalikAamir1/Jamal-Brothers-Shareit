import { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import MainHeader from '../../Components/MainHeader';
import Heading from '../../Components/ReusableComponent/Heading';
import HTMLView from 'react-native-htmlview';

export default function BookmarkStory({ route }) {
    const dataFromParams = route.params.storyData;
    const [loading, setLoading] = useState(false);
    console.log('route.params', dataFromParams.id);

    return (<>
        {loading ? (
            <ImageBackground
                source={require('../../Assets/Images/newimages/bgImg2.png')}
                resizeMode="cover"
                style={{ flex: 1 }}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <ActivityIndicator size="large" color="#7ACCCA" />
                </View>
            </ImageBackground>
        ) : (
            <>
                <SafeArea>
                    <MainHeader />
                    <ScrollView>
                        <View
                            style={{
                                // width: '92%',
                                backgroundColor: '#404552',
                                marginHorizontal: '4%',
                                // height: 100,
                                marginVertical: '10%',
                                borderRadius: 20,
                                padding: 20,
                                // minHeight: 300,
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                            }}>

                            <View style={{ marginHorizontal: '4%', marginTop: '4%' }}>
                                <Heading
                                    mt={2}
                                    // ml={45}
                                    Stylefont={'normal'}
                                    Fontweight={'bold'}
                                    Fontsize={12}
                                    Heading={'Story Tittle: '}
                                    Color={'#AAAAAA'}
                                />
                            </View>

                            <View style={{ marginHorizontal: '4%', marginTop: '2%' }}>
                                <Heading
                                    mt={2}
                                    // ml={45}
                                    Stylefont={'normal'}
                                    Fontweight={'bold'}
                                    Fontsize={12}
                                    Heading={dataFromParams.story.title}
                                    Color={'#7ACCCA'}
                                />
                            </View>

                            <View style={{ marginHorizontal: '4%', marginTop: '2%' }}>
                                <HTMLView
                                    value={`<div>${dataFromParams.story.content}</div>`}
                                    stylesheet={stylesForHtmlText}
                                />
                            </View>

                        </View>
                    </ScrollView>
                </SafeArea>
            </>)
        }
    </>)
}

const stylesForHtmlText = StyleSheet.create({
    // a: {
    //   fontWeight: '300',
    //   color: 'coral', // make links coloured pink
    // },
    div: {
        color: '#CBCBCB',
        fontSize: 12,
    },
    p: {
        color: '#CBCBCB',
    },
    // dark: {
    //   color: 'pink',
    // },
});
