import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <Text style={styles.logo}>EngLab</Text>
        <TouchableOpacity onPress={() => setIsNavOpen(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Side Navigation */}
      {isNavOpen && (
        <TouchableOpacity 
          style={styles.overlay}
          onPress={() => setIsNavOpen(false)}
          activeOpacity={1}
        >
          <View style={styles.sideNav}>
            <TouchableOpacity onPress={() => setIsNavOpen(false)}>
              <Text style={styles.closeBtn}>×</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => {
                setIsNavOpen(false);
                router.push('/LoginScreen');
              }}
            >
              <Text style={styles.navLink}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                setIsNavOpen(false);
                router.push('/SignUpScreen');
              }}
            >
              <Text style={styles.navLink}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                setIsNavOpen(false);
                router.push('/LeaderboardScreen');
              }}
            >
              <Text style={styles.navLink}>Leaderboard</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                setIsNavOpen(false);
                router.push('/QuizScreen');
              }}
            >
              <Text style={styles.navLink}>Quiz</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}


      <Button title="Go to Login" onPress={() => router.push('/LoginScreen')} />
      <Button title="Go to Sign Up" onPress={() => router.push('/SignUpScreen')} />
      <Button title="Go to Leaderboard" onPress={() => router.push('/LeaderboardScreen')} />
      <Button title="Go to Quiz" onPress={() => router.push('/QuizScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    backgroundColor: '#f8f8f8',
    zIndex: 2, // Ensures the top navigation is above the side navigation
  },
  logo: {
    fontSize: 20,
    fontWeight: '600',
  },
  menuIcon: {
    fontSize: 30,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    zIndex: 1, // Ensure the overlay is below the top nav
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
    zIndex: 2, // Ensures the side navigation is above the overlay
  },
  closeBtn: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  navLink: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
});
