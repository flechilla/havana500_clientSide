export enum PictureType {
  Gallery,
  HomePageCarousel,
  MainMarketing,
  SecondaryMarketing,
  Video
}

/**
 * Contains the data to map the PictureTYpe
 * enum from the server.
 *
 * @export
 * @class PictureEnumMapping
 */
export const PictureEnumMapping = [
    { id: 4, value: 'Galería'}, 
    { id: 5, value: 'Carrusel del Home'}, 
    { id: 6, value: 'Marketing 2do Nivel'}, 
    { id: 7, value: 'Marketing 3er nivel'}, 
    { id: 8, value: 'Video de Galería'}, 
  ]

  export function getPictureTypeString(id: number): string {
    return PictureEnumMapping.filter(v => {
      return v.id === id
    })[0].value;
  } 

  export function getPictureTypeNumber(value: string): number {
    return PictureEnumMapping.filter(v => {
      return v.value === value
    })[0].id;
  } 