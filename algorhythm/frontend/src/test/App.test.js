import App from "../components/App.js";

describe("App", () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  test("it renders", () => {
    expect(component).toExist;
  });
});
