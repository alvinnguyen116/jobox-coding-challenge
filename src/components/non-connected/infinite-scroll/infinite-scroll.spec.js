import React from 'react';
import {shallow} from '../../../enzyme';
import InfiniteScroll from "./infinite-scroll";

describe("Infinite Scroll Component" , () => {
    it("should display props.children", () => {
        const children = [1,2,3].map(n => <div className={"items"} key={n}>{n}</div>);
        const wrapper = shallow(<InfiniteScroll handleLastRow={jest.fn()} children={children}/>);
        expect(wrapper.find(".items")).toHaveLength(3);
    });
});