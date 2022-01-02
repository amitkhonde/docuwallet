function PropertyControlledComponent({controllerProperty = true, children}) {
  if (!controllerProperty) return null;

  return children;
}

export default PropertyControlledComponent;
