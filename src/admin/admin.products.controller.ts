import { Body, Controller, Get, Post, Redirect, Render, UseInterceptors, UploadedFile, UploadedFiles, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { throwIfEmpty } from 'rxjs';
import { Product } from 'src/models/product.entity';
import { ProductsService } from 'src/models/products.service';

@Controller('/admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @Render('admin/products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Admin - Online Store';
    viewData['products'] = await this.productsService.findAll();
    return {
      viewData: viewData,
    };
  }
  @Post('/store')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  @Redirect('/admin/products')
  async store(@Body() body, @UploadedFile() file: Express.Multer.File) {
    const newProduct = new Product();
    newProduct.setName(body.name);
    newProduct.setDescription(body.description);
    newProduct.setPrice(body.price);
    newProduct.setImage(file.filename);
    await this.productsService.createOrUpdate(newProduct);
  }

  @Post('/:id')
  @Redirect('admin/products')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('/:id')
  @Render('admin/products/edit')
  async edit(@Param('id') id: string) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Edit Product - Online Store';
    viewData['product'] = await this.productsService.findOne(id);
    return { viewData: viewData };
  }

  @Post('/:id/update')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  @Redirect('/admin/products')
  async update(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const product = await this.productsService.findOne(id);
    product.setName(body.name);
    product.setDescription(body.description);
    product.setPrice(body.price);
    if (file) {
      product.setImage(file.filename);
    }
    await this.productsService.createOrUpdate(product);
  }
}
