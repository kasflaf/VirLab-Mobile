import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { API_ENDPOINTS, apiCall } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Question = {
  id: string;
  type: 'multiple-choice' | 'fill-in-the-blank';
  question: string;
  options?: string[];
  answer: string;
};

const questions: Question[] = [
  { id: '1', type: 'fill-in-the-blank', question: 'The capital of France is _______.', answer: 'Paris' },
  { id: '2', type: 'multiple-choice', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 'Mars' },
  { id: '3', type: 'fill-in-the-blank', question: 'Water boils at _______ degrees Celsius at sea level.', answer: '100' },
  { id: '4', type: 'multiple-choice', question: 'Who painted the Mona Lisa?', options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Michelangelo'], answer: 'Da Vinci' },
];

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    setUserAnswers({ ...userAnswers, [questions[currentQuestion].id]: answer });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(question => {
      if (userAnswers[question.id]?.toLowerCase() === question.answer.toLowerCase()) {
        score++;
      }
    });
    return score;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizCompletion();
    }
  };

  const handleQuizCompletion = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'Please log in to save your score');
        router.push('/LoginScreen' as any);
        return;
      }
  
      const score = calculateScore();
      await apiCall(API_ENDPOINTS.updateScore, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_score: score,
        }),
      });
  
      setShowResults(true);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to save score');
    } finally {
      setLoading(false);
    }
  };  

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    if (question.type === 'multiple-choice') {
      return (
        <View>
          <Text style={styles.question}>{question.question}</Text>
          {question.options?.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.optionButton,
                userAnswers[question.id] === option && styles.selectedOption
              ]}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.question}>{question.question}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleAnswer(text)}
            value={userAnswers[question.id] || ''}
            placeholder="Type your answer here"
          />
        </View>
      );
    }
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Quiz Results</Text>
        <Text style={styles.score}>Your score: {score} / {questions.length}</Text>
        {questions.map((question, index) => (
          <View key={question.id} style={styles.resultItem}>
            <Text style={styles.resultQuestion}>{index + 1}. {question.question}</Text>
            <Text style={styles.resultAnswer}>Your answer: {userAnswers[question.id] || 'Not answered'}</Text>
            <Text style={styles.resultCorrect}>Correct answer: {question.answer}</Text>
          </View>
        ))}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/' as any)}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>Question {currentQuestion + 1} of {questions.length}</Text>
      {renderQuestion()}
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={handleNext}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Saving...' : currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  progress: {
    fontSize: 18,
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#e6f3ff',
    borderColor: '#4a90e2',
  },
  optionText: {
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
  resultItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  resultQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultAnswer: {
    fontSize: 14,
    marginBottom: 5,
  },
  resultCorrect: {
    fontSize: 14,
    color: '#4a90e2',
  },
});