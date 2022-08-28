import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  index() {
    const viewData = [];
    viewData['title'] = 'Home Page - Online Store';
    return { viewData: viewData };
  }

  @Get('/about')
  @Render('about')
  about() {
    const viewData = [];
    viewData['title'] = 'About Us - Online Store';
    viewData['subtitle'] = 'About us';
    viewData['description'] =
      'This page was created using React and NestJS as backend, for more info contact me with the email below';
    viewData['author'] = 'Developed by: Dariel Aguilar';
    return {
      viewData: viewData,
    };
  }
}
