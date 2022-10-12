export const checkInFavorite = (favorite, product) => {
    return favorite.find((f)=> f.id === product.id)
};