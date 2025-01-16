import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4a90e2',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  menuIcon: {
    fontSize: 24,
    color: 'white',
  },
  content: {
    flex: 1,
  },
  hero: {
    backgroundColor: '#4a90e2',
    padding: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  featureCard: {
    width: width / 2 - 30,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sideNav: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: 'white',
    padding: 20,
  },
  closeBtnContainer: {
    alignItems: 'flex-end',
  },
  closeBtn: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  navIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  navLink: {
    fontSize: 18,
  },
});

export default function HomeScreen() {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <Text style={styles.logo}>EngLab</Text>
        <TouchableOpacity onPress={() => setIsNavOpen(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Welcome to EngLab</Text>
          <Text style={styles.heroSubtitle}>Your Journey to English Mastery Starts Here</Text>
        </View>

        <View style={styles.features}>
          <TouchableOpacity 
            style={styles.featureCard} 
            onPress={() => router.push('/QuizScreen' as any)}
          >
            <Text style={styles.featureIcon}>📝</Text>
            <Text style={styles.featureTitle}>Take a Quiz</Text>
            <Text style={styles.featureDescription}>Test your knowledge with our interactive quizzes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => router.push('/LeaderboardScreen' as any)}
          >
            <Text style={styles.featureIcon}>🏆</Text>
            <Text style={styles.featureTitle}>Leaderboard</Text>
            <Text style={styles.featureDescription}>Compare your progress with other learners</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isNavOpen && (
        <TouchableOpacity 
          style={styles.overlay}
          onPress={() => setIsNavOpen(false)}
          activeOpacity={1}
        >
          <View style={styles.sideNav}>
            <TouchableOpacity style={styles.closeBtnContainer} onPress={() => setIsNavOpen(false)}>
              <Text style={styles.closeBtn}>×</Text>
            </TouchableOpacity>
            
            {[
              { title: 'Login', route: '/LoginScreen', icon: '🔐' },
              { title: 'Sign Up', route: '/SignUpScreen', icon: '✍️' },
              { title: 'Leaderboard', route: '/LeaderboardScreen', icon: '🏆' },
              { title: 'Quiz', route: '/QuizScreen', icon: '📝' },
            ].map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.navItem}
                onPress={() => {
                  setIsNavOpen(false);
                  router.push(item.route as any);
                }}
              >
                <Text style={styles.navIcon}>{item.icon}</Text>
                <Text style={styles.navLink}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
