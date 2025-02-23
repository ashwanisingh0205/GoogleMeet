import { useState } from "react";

export const useContainerDimension = () => {
  const [containerDimension, setContainerDimension] = useState('')
    const onContainerLayout = event=>{
        const {width, height} = event.nativeEvent.layout
        setContainerDimension({width, height})
    }
    return {containerDimension, onContainerLayout};
};
