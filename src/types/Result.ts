interface Success<T> {
    success: true;
    data: T;
}
interface Failure {
    error: string;
    code: number;
}

interface Unauthorized extends Failure {
    code: 401;
}
interface NotFound extends Failure {
    code: 404;
}
interface ContentTooLarge extends Failure {
    code: 413;
}
interface InternalServerError extends Failure {
    code: 500;
}

interface LocalError extends Failure {
    code: 0;
}

export { Success, Unauthorized, NotFound, ContentTooLarge, InternalServerError, LocalError };