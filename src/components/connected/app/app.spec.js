import React from "react";
import {shallow} from "../../../enzyme";
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

describe("App Component" , () => {
    it("should display no favorites if app state is showing favorite and there are no current dogs ", () => {
        const dogState = {
            showingFavoriteDogs: true,
            currentDogs: []
        };
        const wrapper = shallow(
            <Provider store={createStore(() => {})}>
                <App dogState={dogState}/>
            </Provider>
        );
        expect(wrapper.find(".no-favorites")).toBeDefined();
    });
});