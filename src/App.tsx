/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StyleSheet, Text, useWindowDimensions, View} from "react-native";
import Button from "./components/Button";
import {useState} from "react";
import {StatusBar} from "expo-status-bar";

const Operators = {
  PLUS: "+",
  MINUS: "-",
  MULTIPLY: "*",
  DIVIDE: "/",
  EQUAL: "=",
  CLEAR: "C",
};

function App() {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);

  let width = (useWindowDimensions().width - 5) / 4;

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = "";

    formula.forEach((value) => {
      if ([Operators.PLUS, Operators.MINUS].includes(value)) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          calculatedNumber += value;
        } else if (operator === Operators.MINUS) {
          calculatedNumber -= value;
        } else {
          calculatedNumber = value;
        }
      }
    });

    setResult(calculatedNumber);
    setFormula([]);
  };

  const onPressNumber = (num) => {
    const last = formula[formula.length - 1] ?? 0;
    if (isNaN(last)) {
      setResult(num);
      setFormula((prev) => [...prev, num]);
    } else {
      const newNumber = (last ?? 0) * 10 + num;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const onPressOperator = (operator) => {
    switch (operator) {
      case Operators.CLEAR:
        setResult(0);
        setFormula([]);
        break;
      case Operators.EQUAL:
        calculate();
        break;
      default: {
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.resultContainer}>
        <Text style={styles.result}>
          {result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
              return (
                <Button
                  key={number}
                  title={number.toString()}
                  onPress={() => onPressNumber(number)}
                  buttonType="number"
                  buttonStyle={{width, height: width, marginBottom: 0.5}}
                />
              );
            })}
          </View>
          <View style={styles.bottom}>
            <Button
              title="0"
              buttonType="number"
              onPress={() => onPressNumber(0)}
              buttonStyle={{width: width * 2, height: width, marginTop: 0.5}}
            />
            <Button
              title={Operators.EQUAL}
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonType="operator"
              buttonStyle={{width: width, height: width, marginTop: 0.5}}
            />
          </View>
        </View>
        <View style={styles.operator}>
          <Button
            title={Operators.CLEAR}
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonType="operator"
            buttonStyle={{width, height: width, marginBottom: 0.5}}
          />
          <Button
            title={Operators.MINUS}
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonType="operator"
            buttonStyle={{width, height: width, marginBottom: 0.5}}
          />
          <Button
            title={Operators.PLUS}
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonType="operator"
            buttonStyle={{width, height: width * 2, marginBottom: 0.5}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  resultContainer: {
    // height: 100,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#000000",
  },
  buttonContainer: {
    // flex: 1,
    // height: 100,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  result: {
    color: "#ffffff",
    fontSize: 60,
    paddingRight: 30,
    paddingBottom: 30,
  },

  leftPad: {
    width: "75%",
  },
  number: {
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "space-evenly",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  operator: {
    flexDirection: "column",
    // justifyContent: "flex-end",
    // alignItems: "stretch",
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
});

export default App;
