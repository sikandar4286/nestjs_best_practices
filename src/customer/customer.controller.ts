import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // HttpStatus,
  // HttpException,
  UseFilters,
  BadRequestException,
  UsePipes,
  Query,
  ValidationPipe,
  UseGuards,
  Req,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ForbiddenException } from 'src/exception-filters/forbidden.exception';
import { HttpExceptionFilters } from 'src/exception-filters/http-exception-filter';
import errors from 'src/config/error-config';
import { ToNumberPipe } from 'src/pipes/to-number.pipe';
import { CustomPipe } from 'src/pipes/custom.pipe';
import { Http2ServerRequest } from 'http2';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import customerValidation from './customer.validation';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Roles } from 'src/decorators/role.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { CustomerInterceptor } from 'src/interceptors/customerInterceptor';

@UsePipes(new ValidationPipe())
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @UsePipes(ToNumberPipe)
  @UseFilters(HttpExceptionFilters)
  @UsePipes(new JoiValidationPipe(customerValidation.createCustomer))
  // @UsePipes(new JoiValidationPipe(customerValidation.createCustomer))
  // @UsePipes(CustomPipe)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto, 'createCustomerDto');
    return this.customerService.create(createCustomerDto);
  }

  @Roles(['admin'])
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Get()
  @UseFilters(HttpExceptionFilters)
  @UseInterceptors(CustomerInterceptor)
  findAll(
    @Req() { userInfo },
    @Query('limit', ToNumberPipe) limit: string,
    @Headers('accept-language') language: string,
  ) {
    try {
      // console.log(limit, typeof limit);
      console.log(userInfo, 'userInfo customer_controller');
      console.log(language, 'Headers, language');
      // return this.customerService.findAll();

      return [
        {
          name: 'sikandar',
          age: 25,
        },
        {
          name: 'ali',
          age: 23,
        },
      ];
    } catch (error) {
      throw new BadRequestException(errors.validationFailed);
    }
    // throw new ForbiddenException();
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'hello',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
