function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "inc",

    () => {
      this.setState(state => ({
        count: state.count == 50 ? state.count : state.count + 1 }));

    });_defineProperty(this, "dec",

    () => {
      if (this.state.count > -50) {
        this.setState(state => ({
          count: state.count - 1 }));

      }
      // this.setState(state => ({
      //   count: state.count == -50 ? state.count : state.count - 1
      // }))
    });_defineProperty(this, "rnd",

    () => {
      this.setState(state => ({
        count: Math.floor(-50 + Math.random() * (50 + 1 - -50)) }));

    });_defineProperty(this, "reset",

    () => {
      this.setState(state => ({
        count: this.props.counter }));

    });this.state = { count: this.props.counter };}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { class: "app" }, /*#__PURE__*/
      React.createElement("div", { class: "counter" }, this.state.count), /*#__PURE__*/
      React.createElement("div", { class: "controls" }, /*#__PURE__*/
      React.createElement("button", { onClick: this.inc }, "INC"), /*#__PURE__*/
      React.createElement("button", { onClick: this.dec }, "DEC"), /*#__PURE__*/
      React.createElement("button", { onClick: this.rnd }, "RND"), /*#__PURE__*/
      React.createElement("button", { onClick: this.reset }, "RESET"))));

  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, { counter: 0 }), document.getElementById('app'));

// 1) Начальное значение счетчика должно передаваться через props
// 2) INC и DEC увеличивают и уменьшают счетчик соответственно на 1. Без ограничений, но можете добавить границу в -50/50. По достижению границы ничего не происходит
// 3) RND изменяет счетчик в случайное значение от -50 до 50. Конструкцию можете прогуглить за 20 секунд :) Не зависит от предыдущего состояния
// 4) RESET сбрасывает счетчик в 0 или в начальное значение из пропсов. Выберите один из вариантов