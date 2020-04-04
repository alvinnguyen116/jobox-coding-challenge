import React from 'react';
import {shallow} from '../../../enzyme';
import Photo from "./photo";

describe("Photo Component" , () => {
    it("should be inactive if not loaded", () => {
        const wrapper = shallow(<Photo isLoaded={false}/>);
        expect(wrapper.find(".photo.inactive")).toBeDefined();
    });

    it("should be yellow if favorited", () => {
        const wrapper = shallow(<Photo isLoaded={true} isFavorite={true}/>);
        expect(wrapper.find(".favorite")).toBeDefined();
    });
});