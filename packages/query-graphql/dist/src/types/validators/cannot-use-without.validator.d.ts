import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
/** @internal */
export declare class CannotUseWithout implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
