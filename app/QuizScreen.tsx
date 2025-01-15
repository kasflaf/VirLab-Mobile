import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Question = {
  type: string;
  question: string;
  options?: string[];
  answer: string;
};

const questions: Question[] = [
  {
    type: "fill-in-the-blank",
    question: "The capital of France is _______.",
    answer: "Paris",
  },
  {
    type: "multiple-choice",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    type: "fill-in-the-blank",
    question: "Water boils at _______ degrees Celsius at sea level.",
    answer: "100",
  },
  {
    type: "multiple-choice",
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"],
    answer: "Da Vinci",
  },
];

const QuizScreen: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    if (question.type === "multiple-choice") {
      return (
        <View>
          <Text style={styles.question}>{question.question}</Text>
          {question.options?.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionButton}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.question}>{question.question}</Text>
          <Text style={styles.answer}>(Fill-in-the-blank answer: {question.answer})</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderQuestion()}
      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    width: '100%',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 24,
    backgroundColor: '#2c3e50',
    padding: 12,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  answer: {
    fontSize: 16,
    color: 'gray',
    fontStyle: 'italic',
    marginTop: 8,
  },
});

export default QuizScreen;
