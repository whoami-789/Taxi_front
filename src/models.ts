export interface Car {
    id: number;
    name: string;
    brand: string;
    date_release: string;
    price: number;
    carClasses: string[];
    img: string;
    taken?: boolean;
    order: any[]; // Предполагается, что это массив заказов, замените на соответствующий тип данных
}

export interface User {
    id: number;
    name: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    password: string;
    roles: string[];
    order: any[]; // Предполагается, что это массив заказов, замените на соответствующий тип данных
    authorities: any; // Замените на соответствующий тип данных
    enabled: boolean;
    username: string;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
}