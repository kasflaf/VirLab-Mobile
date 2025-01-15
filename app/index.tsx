// index.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const openNav = () => setIsNavOpen(true);
  const closeNav = () => setIsNavOpen(false);

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <Text style={styles.logo}>EngLab</Text>
        <TouchableOpacity onPress={openNav}>
          <Text style={styles.menuIcon}>&#9776;</Text>
        </TouchableOpacity>
      </View>

      {/* Side Navigation */}
      {isNavOpen && (
        <View style={styles.sideNav}>
          <TouchableOpacity onPress={closeNav}>
            <Text style={styles.closeBtn}>&times;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.navLink}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.navLink}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
            <Text style={styles.navLink}>Leaderboard</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    fontSize: 20,
    fontWeight: '600',
  },
  menuIcon: {
    fontSize: 30,
  },
  sideNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  closeBtn: {
    fontSize: 30,
    textAlign: 'right',
    marginBottom: 20,
  },
  navLink: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default HomeScreen;
