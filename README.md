# 🧮 Scientific Calculator

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) 

A scientific calculator built with Vanilla JavaScript. Unlike standard tutorial projects, this application implements a full mathematical expression parser using Computer Science fundamentals.

## 🚀 [Live Demo](https://arisloumos.github.io/scientific-calculator/)

## 🛠️ Technical Engineering Highlights
The core of this project is a custom-built engine that processes mathematical strings without using the insecure `eval()` function.

### 1. The Shunting-Yard Algorithm
I implemented **Dijkstra's Shunting-Yard algorithm** to convert human-readable (Infix) notation into Reverse Polish Notation (Postfix). This ensures:
- **Operator Precedence:** Multiplication and division are handled before addition and subtraction.
- **Parentheses Support:** Correct handling of nested operations.
- **Exponentiation:** Support for the `^` operator with correct right-to-left associativity.

### 2. Regex Tokenization
The input is processed through a **Regular Expression Tokenizer** that identifies:
- Scientific functions (`sin`, `cos`, `tan`, `log`, `sqrt`).
- Mathematical constants (`π`, `e`).
- Multi-digit floating-point numbers.

### 3. Professional UX Features
- **Dynamic Font Scaling:** The display automatically adjusts font sizes as the equation length increases to maintain visibility.
- **Keyboard Support:** Full mapping for physical keyboard input, including `Enter` for equals and `Backspace` for deletion.
- **Smart Result Formatting:** Handles floating-point errors (e.g., `0.1 + 0.2`) and switches to Scientific Notation for extremely large results.
- **Responsive Design:** Built with CSS Grid and flexbox for a perfectly centered, modern mobile-first UI.

## 🧠 Skills Demonstrated
- **Data Structures:** Implementation of Stacks and Queues.
- **Algorithms:** Expression parsing and Postfix evaluation.
- **Modern JavaScript:** Event delegation, DOM manipulation, and Regex.
- **UI/UX Design:** Dark mode aesthetics and dynamic scroll-to-end functionality.

## 📂 Project Structure
- `index.html`: Structural markup using semantic HTML and data-attributes.
- `styles.css`: Modern UI with CSS Variables, Grid layout, and custom scrollbar styling.
- `index.js`: The logic engine containing the Tokenizer, Shunting-Yard, and Postfix