import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IDimension} from "../../../common/interfaces/dimension.interface";

@Entity('dimension')
export class DimensionEntity implements IDimension{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    name: string;

    @Column()
    width: number;

    @Column()
    height: number;
}