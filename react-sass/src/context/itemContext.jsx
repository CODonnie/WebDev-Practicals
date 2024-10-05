import { createContext } from 'react';
import { wears_items } from '../assets/assets';
import Proptypes from 'prop-types';

export const ItemContext = createContext(null);

const ItemContextProvider = (props) => {


	const wearsContext = {
		wears_items
	};

	return (
		<ItemContext.Provider value={wearsContext}>
			{props.children}
		</ItemContext.Provider>
	)
}

export default ItemContextProvider;

ItemContextProvider.propTypes = {
	props: Proptypes.any
}
