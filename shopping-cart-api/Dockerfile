FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /app

COPY *.csproj .
RUN dotnet restore --disable-parallel
COPY . .
RUN dotnet publish -c Release -o build

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
WORKDIR /app

COPY --from=build /app/build .
ENTRYPOINT [ "dotnet", "shopping-cart-api.dll" ]