"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassTransformerAssembler = void 0;
const class_transformer_1 = require("class-transformer");
const abstract_assembler_1 = require("./abstract.assembler");
const assembler_serializer_1 = require("./assembler.serializer");
const assembler_deserializer_1 = require("./assembler.deserializer");
/**
 * Base assembler that uses class-transformer to transform to and from the DTO/Entity.
 */
class ClassTransformerAssembler extends abstract_assembler_1.AbstractAssembler {
    convertToDTO(entity) {
        return this.convert(this.DTOClass, this.toPlain(entity));
    }
    convertToEntity(dto) {
        return this.convert(this.EntityClass, this.toPlain(dto));
    }
    convertQuery(query) {
        return query;
    }
    convertAggregateQuery(aggregate) {
        return aggregate;
    }
    convertAggregateResponse(aggregate) {
        return aggregate;
    }
    convertToCreateEntity(create) {
        return this.convert(this.EntityClass, create);
    }
    convertToUpdateEntity(create) {
        return this.convert(this.EntityClass, create);
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    convert(cls, obj) {
        const deserializer = (0, assembler_deserializer_1.getAssemblerDeserializer)(cls);
        if (deserializer) {
            return deserializer(obj);
        }
        return (0, class_transformer_1.plainToClass)(cls, obj);
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    toPlain(entityOrDto) {
        if (entityOrDto && entityOrDto instanceof this.EntityClass) {
            const serializer = (0, assembler_serializer_1.getAssemblerSerializer)(this.EntityClass);
            if (serializer) {
                return serializer(entityOrDto);
            }
        }
        else if (entityOrDto instanceof this.DTOClass) {
            const serializer = (0, assembler_serializer_1.getAssemblerSerializer)(this.DTOClass);
            if (serializer) {
                return serializer(entityOrDto);
            }
        }
        else if ('constructor' in entityOrDto) {
            // eslint-disable-next-line @typescript-eslint/ban-types
            const serializer = (0, assembler_serializer_1.getAssemblerSerializer)(entityOrDto.constructor);
            if (serializer) {
                return serializer(entityOrDto);
            }
        }
        // eslint-disable-next-line @typescript-eslint/ban-types
        return entityOrDto;
    }
}
exports.ClassTransformerAssembler = ClassTransformerAssembler;
//# sourceMappingURL=class-transformer.assembler.js.map