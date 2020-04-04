import React from 'react';
import {shallow} from '../../../enzyme';
import ErrorBoundary from "./error-boundary";

describe("Error Boundary Component" , () => {
   it("should display props.children if there is no error", () => {
       const children = (<h1 className={"test"}/>);
       const wrapper = shallow(<ErrorBoundary children={children}/>);
       expect(wrapper.find(".test")).toBeDefined();
   });

   it("should display an error messgage if there is an error", () => {
       const wrapper = shallow(<ErrorBoundary/>);
       wrapper.setState({hasError: true});
       expect(wrapper.find(".error-boundary")).toBeDefined();
   });
});