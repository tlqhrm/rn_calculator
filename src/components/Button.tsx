import {Pressable, StyleSheet, Text} from "react-native";

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  buttonStyle?: object;
  buttonType?: "number" | "operator";
}

const Colors = {
  number: ["#71717a", "#404040"],
  operator: ["#f59e0b", "#b45309"],
};

const Button = ({
  title,
  onPress,
  buttonStyle,
  buttonType = "number",
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {backgroundColor: Colors[buttonType][pressed ? 1 : 0]},
        buttonStyle,
      ]}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    color: "#ffffff",
  },
});

export default Button;
