import React from 'react'; //리액트 가져옴
import {Text, View, StyleSheet} from 'react-native'; //Text, View, StyleSheet 컴포넌트를 react-native로부터 가져온다

export default function Header() { //컴포넌트 함수형태로 정의
    return(
        <View style={styles.headercontainer}> 
            <Text style={styles.headertext}>MyTodoApp</Text>
        </View>
    );
};

const styles = StyleSheet.create({ 
    headercontainer: { //타이틀 전체를 감싸는 컨테이너를 만들고 위치를 설정해준다.
        marginTop:60, 
        marginBottom:50,
    },

    headertext: { //타이틀 Text 자체의 스타일을 설정해준다.
        fontSize: 25,
        fontWeight:'bold',
        color: '#3f4e66',
    },
  });