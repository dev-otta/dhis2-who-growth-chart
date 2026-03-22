export interface MappedEntityValues {
    dateOfBirth: string | undefined;
    gender: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    [key: string]: string | undefined;
}

export const EMPTY_MAPPED_ENTITY_VALUES: MappedEntityValues = {
    dateOfBirth: undefined,
    gender: undefined,
    firstName: undefined,
    lastName: undefined,
};
