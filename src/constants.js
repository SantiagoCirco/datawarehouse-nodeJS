
const ERRORS = {
    SERVER_ERROR: {
        ok: false,
        status: 500,
        message: 'Las computadoras pueden equivocarse como las personas. Pero a diferencia de las personas, ellas siempre admiten sus errores. Por favor, dame una oportunidad para mejorar. Intentá nuevamente más adelante.',
        code: 'SERVER_ERROR'
    },
    INVALID_LOGIN_CRED: {
        ok: false,
        status: 401,
        message: 'El usuario o la contraseña son incorrectos.',
        code: 'INVALID_LOGIN_CRED'
    },
    USER_EXISTS: {
        ok: false,
        status: 401,
        message: 'El correo ya se encuentra registrado.',
        code: 'USER_EXISTS'
    },
    INPUT_FORMAT: {
        ok: false,
        status: 404,
        message: 'El correo y la contraseña deben ser válidos.',
        code: 'INPUT_FORMAT'
    },
    INVALID_EMAIL: {
        ok: false,
        status: 404,
        message: 'Debes ingresar un correo válido.',
        code: 'INVALID_EMAIL'
    },
    INVALID_TOKEN: {
        ok: false,
        status: 404,
        message: 'El token de usuario no es válido.',
        code: 'INVALID_TOKEN'
    },
    UNAUTHORIZED: {
        ok: false,
        status: 401,
        message: 'Se requiere credenciales con autorización.',
        code: 'UNAUTHORIZED'
    },
    SESSION_EXPIRED: {
        ok: false,
        status: 401,
        message: 'Su token de autenticación expiró',
        code: 'SESSION_EXPIRED'
    },
    USER_NOT_FOUND: {
        ok: false,
        status: 404,
        message: 'No se puede encontrar un usuario con ese ID',
        code: 'USER_NOT_FOUND'
    },
    USER_NOT_EXISTS: {
        ok: false,
        status: 404,
        message: 'El usuario no existe',
        code: 'USER_NOT_EXISTS',
    },
    MISSING_FIELDS: {
        ok: false,
        status: 409,
        message: 'Faltan datos en el body del request.',
        code: 'MISSING_FIELDS'
    },
    REGION_NOT_FOUND: {
        ok: false,
        status: 404,
        message: 'La region no se pudo encontrar',
        code: 'REGION_NOT_FOUND'
    },
    COUNTRY_ALREADY_EXISTS: {
        ok: false,
        status: 403,
        message: 'El país que intenta crear ya existe.',
        code: 'COUNTRY_ALREADY_EXISTS'
    },
    REGION_ALREADY_EXISTS: {
        ok: false,
        status: 403,
        message: 'La region que intenta crear ya existe.',
        code: 'REGION_ALREADY_EXISTS'
    },
    COUNTRY_NOT_FOUND: {
        ok: false,
        status: 404,
        message: 'El país no se pudo encontrar.',
        code: 'COUNTRY_NOT_FOUND'
    },
    CITY_NOT_FOUND: {
        ok: false,
        status: 404,
        message: 'La ciudad no se pudo encontrar.',
        code: 'CITY_NOT_FOUND'
    },
    CITY_ALREADY_EXISTS: {
        ok: false,
        status: 403,
        message: 'La ciudad que intenta crear ya existe.',
        code: 'CITY_ALREADY_EXISTS'
    },
    RESOURCE_NEEDED: {
        ok: false,
        status: 403,
        message: 'El recurso no se puede eliminar porque está siendo usado',
        code: 'RESOURCE_NEEDED'
    },
    COMPANY_NOT_FOUND: {
        ok: false,
        status: 404,
        message: 'La compañía no se pudo encontrar.',
        code: 'COMPANY_NOT_FOUND'
    },
    CHANNEL_NOT_FOUND: {
        ok: false,
        status: 404,
        message: 'El canal de contacto no se pudo encontrar',
        code: 'CHANNEL_NOT_FOUND'
    },
    CONTACT_NOT_FOUND: {
        ok: false,
        status: 404,
        message: 'El contacto que desea encontrar no existe',
        code: "CONTACT_NOT_FOUND",
    },
    POSITION_NOT_FOUND: {
        ok: false,
        status: 404,
        message: 'El puesto que desea encontrar no existe',
        code: "POSITION_NOT_FOUND",
    }
};

const response = (data) => {
    return {
        ok: true,
        data
    }
}

module.exports = { ERRORS, response };