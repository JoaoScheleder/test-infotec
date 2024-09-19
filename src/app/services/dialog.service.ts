import { Injectable, ApplicationRef, Injector, ComponentRef, EmbeddedViewRef, ComponentFactoryResolver } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';

interface DialogComponentInstance {
  title: string;
  data : string;
  [key: string]: any;
}
@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver // Use the resolver to create component factories
  ) {}

  openDialog<T>(component: ComponentType<T>, title: string, data: any): ComponentRef<T> {
    // Resolve the component factory
    const factory = this.resolver.resolveComponentFactory(component);

    // Create the component using the factory and inject dependencies
    const componentRef = factory.create(this.injector);

    // Pass the title and data to the component instance
    (componentRef.instance as any).title = title;
    (componentRef.instance as any).data = data;

    // Attach the component to the appRef so Angular knows to manage it
    this.appRef.attachView(componentRef.hostView);

    // Append the component to the DOM
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    return componentRef;
  }

  closeDialog(componentRef: ComponentRef<any>) {
    // Remove from DOM and destroy the component
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}

