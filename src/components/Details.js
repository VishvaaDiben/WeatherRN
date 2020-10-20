import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import {Card} from 'react-native-paper';
import moment from 'moment';

const Details = (props) => {
  const {dayDetails} = props.route.params;
  const {city} = props.route.params;

  const [dayWeather, setDayWeather] = useState(dayDetails);
  return (
    <View style={{flex: 1}}>
      <Card style={styles.cardSpace}>
        <Text style={styles.textProperties}>{city.name}</Text>
        <Text style={styles.textProperties}>
          {moment(dayWeather[0].dt * 1000).format('dddd  D MMM YYYY')}
        </Text>
        <Text style={styles.textProperties}>
          {dayWeather[0].weather[0].description}
        </Text>
        <Text style={styles.textProperties}>
          {moment(dayWeather[0].dt * 1000).format('h A')}
        </Text>
        <Image
          style={styles.imageProperties}
          source={{
            uri: `https://openweathermap.org/img/w/${dayWeather[0].weather[0].icon}.png`,
          }}
        />
        <Text style={styles.titleText}>
          {dayWeather[0].main.temp.toFixed()}&#8451;
        </Text>
      </Card>
      <FlatList
        data={dayWeather.splice(1)}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: '#ffffff',
            }}>
            <Text style={styles.listTextProperties}>
              {moment(item.dt * 1000).format('h A')}
            </Text>

            <Image
              style={styles.listImageProperties}
              source={{
                uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`,
              }}
            />
            <Text style={styles.listTextProperties}>
              {item.main.temp.toFixed()}&#8451;
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#9A9CAE',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cardSpace: {
    padding: 20,
    alignItems: 'center',
  },
  textProperties: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#9A9CAE',
    paddingTop: 5,
    fontWeight: 'bold',
  },
  listTextProperties: {
    color: '#9A9CAE',
    fontWeight: 'bold',
    fontSize: 15,
  },
  imageProperties: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  listImageProperties: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});

export default Details;
