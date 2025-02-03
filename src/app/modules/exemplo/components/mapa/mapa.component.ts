import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../../../../../environments/environment';
import { BaseComponent } from '../../../../core/base/base.component';
import { MapaService } from '../../services/mapa.service';

declare const google: any;

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [GoogleMapsModule],
  providers: [MapaService],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent extends BaseComponent implements OnInit {

  map!: google.maps.Map;
  apiKey: string = environment.mapsKey;
  latitude!: number;
  longitude!: number;
  enderecoList: any;
  enderecoHTML = '';

  apiList = [
    {
      name: 'Geocoding',
      link: 'geocoding',
      id: 1,
    },
    {
      name: 'Geolocation',
      link: 'geolocation',
      id: 2,
    },
    {
      name: 'Maps JavaScript',
      link: 'javascript',
      id: 3,
    },
    {
      name: 'Maps Static',
      link: 'maps-static',
      id: 4,
    },
    {
      name: 'Directions',
      link: 'directions',
      id: 5,
    },
    {
      name: 'Places',
      link: 'places',
      id: 6,
    },
    {
      name: 'SDK for Android',
      link: 'android-sdk',
      id: 7,
    },
    {
      name: 'SDK for IOs',
      link: 'ios-sdk',
      id: 8,
    },
  ]

  @ViewChild('map') mapElement!: ElementRef;

  constructor(private mapaService: MapaService) {
    super();
  }

  ngOnInit(): void {
    this.loaded();
    this.loadGoogleMaps();
  }

  // Carrega o script da API Google Maps apenas uma vez para evitar múltiplos carregamentos
  async loadGoogleMaps() {
    if (!this.isGoogleMapsLoaded()) {
      await this.loadGoogleMapsScript();
    }
    this.initMap();
  }

  // Verifica se o Google Maps já foi carregado
  isGoogleMapsLoaded(): boolean {
    return typeof google !== 'undefined' && typeof google.maps !== 'undefined';
  }

  // Carrega o script da API Google Maps dinamicamente
  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve) => {
      (window as any)['mapInit'] = () => resolve();
      const script = document.createElement('script');
      script.id = 'googleMaps';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=mapInit`;
      document.body.appendChild(script);
    });
  }

  // Inicializa o mapa, obtendo a localização atual do usuário
  async initMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.initializeMap();
      }, () => {
        console.log('O Usuário precisa permitir o uso do GPS');
      });
    }
  }

  // Inicializa o mapa e define o marcador
  async initializeMap(): Promise<void> {
    const position = { lat: this.latitude, lng: this.longitude };

    // Carrega as bibliotecas necessárias da API Google Maps
    //@ts-ignore
    const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
    //@ts-ignore
    const { Marker } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary;

    // Configura o mapa com a posição inicial
    this.map = new Map(this.mapElement.nativeElement, {
      zoom: 16,
      center: position,
      mapId: 'DEMO_MAP_ID',
    });

    // Configura o marcador na posição inicial
    const marker = new Marker({
      map: this.map,
      position: position,
    });

    // Adiciona um evento para alterar o marcador quando o mapa for clicado
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => this.onMapClick(event, marker));

    // Busca o endereço inicial
    //this.getEndereco();
  }

  // Atualiza a posição do marcador no mapa e obtém o endereço da nova localização
  onMapClick(event: google.maps.MapMouseEvent, marker: google.maps.Marker) {
    marker.setPosition(event.latLng!);
    this.latitude = event.latLng!.lat();
    this.longitude = event.latLng!.lng();
    this.getEndereco();
  }

  // Obtém o endereço com base nas coordenadas atuais
  // Para utilizar o recurso de seleção de endereço no Maps, é necessário possuir uma API Key habilitada com permissão Geocoding API.
  getEndereco() {
    this.loading();
    this.mapaService.reverseGeocode(this.latitude, this.longitude).subscribe({
      next: (geocode) => this.processGeocodeResponse(geocode),
      error: (error) => {
        this.loaded();
        console.error('Erro ao obter o endereço:', error)
      }
    });
  }

  // Processa a resposta da API de geocodificação e formata o endereço
  processGeocodeResponse(geocode: any) {
    if (geocode && geocode.results.length > 0) {
      const endereco = geocode.results[0];
      if (endereco.types[0] === 'plus_code') {
        this.enderecoList = endereco.address_components;
        const formattedEndereco = this.formatEndereco();
        this.enderecoHTML = `${formattedEndereco?.cidade || ''} - ${formattedEndereco?.uf || ''}`;
      } else {
        this.enderecoHTML = endereco.formatted_address;
      }
    }
    this.loaded();
  }

  // Formata os componentes do endereço em um objeto organizado
  formatEndereco() {
    return {
      nro: this.findAddressComponent('street_number', true),
      rua: this.findAddressComponent('route'),
      bairro: this.findAddressComponent('sublocality_level_1', true),
      cidade: this.findAddressComponent('administrative_area_level_2'),
      uf: this.findAddressComponent('administrative_area_level_1', true),
    };
  }

  // Busca um componente específico do endereço retornado pela API de geocodificação
  findAddressComponent(type: string, short = false) {
    const component = this.enderecoList.find((item: { types: string[] }) => item.types.includes(type));
    return component ? (short ? component.short_name : component.long_name) : '';
  }
}
