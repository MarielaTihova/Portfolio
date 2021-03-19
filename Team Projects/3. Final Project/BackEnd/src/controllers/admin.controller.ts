
import { UserRole } from './../models/enums/user-role';
import { RolesGuard } from './../auth/roles.guard';

import {
    Controller, Get, HttpStatus, HttpCode, Param, Post, Body, ValidationPipe, UseGuards, Delete, ParseIntPipe,/*, Body, Post, Put, Param, UnauthorizedException, BadRequestException, Get*/
} from "@nestjs/common";
import { UsersService } from "src/services/users.service";
import { ReviewDTO } from "src/dtos/reviews/review.dto";
import { UserDTO } from "src/dtos/users/user.dto";
import { RegisterUserDTO } from "src/dtos/users/register-user.dto";
import { AuthGuard } from '@nestjs/passport';
import { UserId } from 'src/auth/user-id.decorator';
import { BlacklistGuard } from 'src/auth/blacklist.guard';
import { AdminService } from 'src/services/admin.service';
//import { WorkspacesService } from 'src/services/workspaces.service';


@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        // private readonly workspaceService: WorkspacesService,
    ) { }

    // ADMIN
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    @Get('users')
    async getAllUsers(): Promise<UserDTO[]> {
        return await this.adminService.getAllUsers();

    }

    // PUBLIC
    @Post('users')
    async registerUser(@Body(new ValidationPipe({ whitelist: true })) userDto: RegisterUserDTO): Promise<UserDTO> {
        return await this.adminService.registerUser(userDto);
    }

    // ADMIN
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    // @UseGuards(AuthGuard('jwt'))
    @Get('users/:id')
    async getUserById(@Param('id') id: string): Promise<UserDTO> {
        return this.adminService.getUserById(+id);
    }

    // ADMIN
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    // @Get(':id/reviews')
    // @HttpCode(HttpStatus.FOUND)
    // async readUserReviews(@Param('id') id: string): Promise<ReviewDTO[]> {
    //     return await this.usersService.readUserReviews(+id)
    // }


    // ADMIN
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    // @Get(':id/reviews/:reviewsId')  // I think that should be :id/userreviews/rreviewsID
    // @HttpCode(HttpStatus.FOUND)
    // async getBookReviewById(@Param('id') bookId: string,
    //     @Param('reviewId') reviewId: string): Promise<ReviewDTO> {
    //     return await this.usersService.getUserReviewById(+bookId, +reviewId);
    // }


    // ADMIN 
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    @Delete('users/:id')
    public async deleteUser(@Param('id') userId: string) {
        return await this.adminService.deleteUserById(+userId);
    }

    @Post(':id/ban')
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    async banUser(@Param('id', ParseIntPipe) userId: number, @Body(new ValidationPipe({ whitelist: true })) banDTO: any) {
        return await this.adminService.banUser(userId, banDTO.period)
    }

}