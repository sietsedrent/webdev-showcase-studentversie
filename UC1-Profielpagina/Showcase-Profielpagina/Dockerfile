# Gebruik de .NET 8.0 SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Kopieer het projectbestand en herstel de afhankelijkheden
COPY Showcase-Profielpagina.csproj ./
RUN dotnet restore

# Kopieer de rest van de code en bouw de applicatie
COPY . ./
RUN dotnet publish -c Release -o out

# Gebruik een lichtgewicht runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Stel de poort in waarop de applicatie moet draaien
ENV ASPNETCORE_URLS=http://+:8080

# Expose poort 8080
EXPOSE 8080

# Start de applicatie
ENTRYPOINT ["dotnet", "Showcase-Profielpagina.dll"]
