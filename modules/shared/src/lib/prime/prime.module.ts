import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenubarModule } from 'primeng/menubar';
import { ConfirmationService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { StepperModule } from 'primeng/stepper';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  imports: [FormsModule],
  exports: [
    AutoCompleteModule,
    CalendarModule,
    CardModule,
    DialogModule,
    ButtonModule,
    SidebarModule,
    ConfirmDialogModule,
    AvatarModule,
    AvatarGroupModule,
    InputTextModule,
    FileUploadModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    DividerModule,
    StyleClassModule,
    PanelModule,
    CheckboxModule,
    PasswordModule,
    FloatLabelModule,
    TieredMenuModule,
    MenubarModule,
    TabMenuModule,
    InputGroupModule,
    StepperModule,
    InputGroupAddonModule,
    DropdownModule,
    ToastModule,
    TableModule,
    TagModule,
    TabViewModule,
    ProgressSpinnerModule,
    ToolbarModule,
    FieldsetModule,
    ConfirmPopupModule,
    ToggleButtonModule,
    PanelModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class PrimeModule {}
