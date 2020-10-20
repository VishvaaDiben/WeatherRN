import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import moment from 'moment';

const Home = ({navigation}) => {
  const [city, setCity] = useState({
    date: '...',
    name: '...',
    temp: '...',
    desc: '...',
  });
  const [forecast, setForecast] = useState([]);
  const [threeHourData, setThreeHourData] = useState([]);
  const API_key = '9895a789d1f377b18fb0e16958a4dd57';
  const cityName = 'Kuala Lumpur';

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${API_key}&units=metric`,
      )
      .then((response) => {
        setCity({
          name: response.data.city.name,
          date: response.data.list[0].dt,
          temp: response.data.list[0].main.temp,
          desc: response.data.list[0].weather[0].description,
        });
        setThreeHourData(response.data.list);
        const filterFiveDays = response.data.list.filter((singleHour) =>
          singleHour.dt_txt.includes('18:00:00'),
        );
        setForecast(filterFiveDays);
      })
      .catch((error) => {
        console.log('ERROR: ', error);
      });
  }, []);

  const dayCardClick = (selectedDate) => {
    let daySelected = threeHourData.filter(
      (data) =>
        moment(data.dt * 1000).format('dddd') ==
        moment(selectedDate * 1000).format('dddd'),
    );
    navigation.navigate('Details', {dayDetails: daySelected, city: city});
  };

  return (
    <View style={{flex: 1}}>
      <Card style={styles.cardSpace} onPress={() => dayCardClick(city.date)}>
        <Text style={styles.textProperties}>{city.name}</Text>
        <Text style={styles.textProperties}>
          {moment(city.date * 1000).format('dddd  D MMM YYYY')}
        </Text>
        <Text style={styles.titleText}>
          {parseFloat(city.temp).toFixed()}&#8451;
        </Text>
        <Text style={styles.textProperties}>{city.desc}</Text>
      </Card>

      <FlatList
        data={forecast.slice(1)}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={({item}) => (
          <Card onPress={() => dayCardClick(item.dt)} style={styles.item}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.listTextProperties}>
                  {moment(item.dt * 1000).format('dddd  D MMM YYYY')}
                </Text>
                <Text style={styles.listTextProperties}>
                  {item.main.temp_min.toFixed()}&#8451; -
                  {item.main.temp_max.toFixed()}&#8451;
                </Text>
                <Text style={styles.listTextProperties}>
                  {item.weather[0].description}
                </Text>
              </View>
              <View>
                <Icon name="angle-right" size={40} color="#7ED9E8" />
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomColor: '#7ED9E8',
    borderTopColor: '#7ED9E8',
    borderBottomWidth: 1,
    borderTopWidth: 2,
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#9A9CAE',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cardSpace: {
    padding: 50,
    flexDirection: 'column',
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
  },
});

export default Home;
