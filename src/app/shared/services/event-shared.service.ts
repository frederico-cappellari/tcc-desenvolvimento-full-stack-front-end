import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class EventSharedService {

  // Um objeto estático que armazena emissores de eventos (EventEmitters) identificados por nome.
  private static emitters: Record<string, EventEmitter<any>> = {};

  // Método estático que retorna um EventEmitter associado ao nome do evento.
  static get(nomeEvento: string): EventEmitter<any> {
    // Se não houver um EventEmitter para o nome do evento, cria um novo.
    if (!this.emitters[nomeEvento])
      this.emitters[nomeEvento] = new EventEmitter<any>();

    // Retorna o EventEmitter associado ao nome do evento.
    return this.emitters[nomeEvento];
  }
}
