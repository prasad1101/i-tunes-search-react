import React from 'react';
import {shallow} from 'enzyme'; //shallow render our component
import Search from './Search';


it('it should render title',()=>{
    const container = shallow(<Search />);
    const h2 = container.find('h2');
    const result = h2.text();

    expect(result).toBe('iTunes Search: React app');
})


it('it should render search results', ()=>{
    const comp = shallow(<Search />);
    const instance = comp.instance();
    const result = instance.fetchSearchResults('a');
    const len = result.length;

    expect(len).toHaveLength(!0)})
