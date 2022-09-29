import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
/** @internal */
export declare class PropertyMax implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
